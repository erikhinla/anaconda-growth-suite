import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AudioRecorder, encodeAudioForAPI } from "@/utils/AudioRecorder";
import { AudioQueue } from "@/utils/AudioPlayer";
import { Phone, PhoneOff, Mic } from "lucide-react";

const VoiceAgent = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const audioQueueRef = useRef<AudioQueue | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    audioQueueRef.current = new AudioQueue(audioContextRef.current);

    return () => {
      disconnect();
      audioContextRef.current?.close();
    };
  }, []);

  const connect = async () => {
    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const wsUrl = `wss://${projectId}.supabase.co/functions/v1/voice-agent`;
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = async () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        
        // Start recording
        recorderRef.current = new AudioRecorder((audioData) => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            const encoded = encodeAudioForAPI(audioData);
            wsRef.current.send(JSON.stringify({
              type: 'input_audio_buffer.append',
              audio: encoded
            }));
          }
        });
        
        await recorderRef.current.start();
        setIsListening(true);

        toast({
          title: "Connected",
          description: "Voice agent is ready. Start speaking!",
        });
      };

      wsRef.current.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        console.log("Message type:", data.type);

        if (data.type === 'response.audio.delta' && data.delta) {
          const binaryString = atob(data.delta);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          await audioQueueRef.current?.addToQueue(bytes);
        } else if (data.type === 'response.audio_transcript.delta' && data.delta) {
          setTranscript(prev => prev + data.delta);
        } else if (data.type === 'response.audio_transcript.done') {
          setTranscript("");
        }
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to voice agent",
          variant: "destructive",
        });
        disconnect();
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket closed");
        disconnect();
      };

    } catch (error) {
      console.error("Error connecting:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start voice agent",
        variant: "destructive",
      });
    }
  };

  const disconnect = () => {
    recorderRef.current?.stop();
    wsRef.current?.close();
    audioQueueRef.current?.clear();
    setIsConnected(false);
    setIsListening(false);
    setTranscript("");
  };

  return (
    <div className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Experience Our AI Voice Concierge
            </h2>
            <p className="text-xl text-muted-foreground">
              Try a live demo of our AI-powered appointment booking system
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-luxury">
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 rounded-full gradient-luxury flex items-center justify-center relative">
                {isListening && (
                  <div className="absolute inset-0 rounded-full animate-pulse bg-luxury-bronze/20" />
                )}
                <Mic className={`w-16 h-16 text-primary-foreground ${isListening ? 'animate-pulse' : ''}`} />
              </div>

              {transcript && (
                <div className="w-full bg-muted/50 rounded-xl p-4 min-h-[80px]">
                  <p className="text-sm text-muted-foreground text-center">
                    {transcript}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                {!isConnected ? (
                  <Button
                    onClick={connect}
                    size="lg"
                    className="gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Start Call
                  </Button>
                ) : (
                  <Button
                    onClick={disconnect}
                    variant="destructive"
                    size="lg"
                    className="gap-2"
                  >
                    <PhoneOff className="w-5 h-5" />
                    End Call
                  </Button>
                )}
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Click "Start Call" and speak naturally with our AI concierge
                </p>
                <p className="text-xs text-muted-foreground">
                  {isConnected ? (
                    <span className="text-luxury-gold font-medium">● Connected - Speak now</span>
                  ) : (
                    "Ready to connect"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgent;
