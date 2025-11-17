import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, upgrade, connection',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { socket, response } = Deno.upgradeWebSocket(req);
    
    let openAISocket: WebSocket | null = null;

    socket.onopen = async () => {
      console.log("Client WebSocket connected");
      
      // Connect to OpenAI Realtime API
      const model = "gpt-4o-realtime-preview-2024-10-01";
      openAISocket = new WebSocket(
        `wss://api.openai.com/v1/realtime?model=${model}`,
        {
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "OpenAI-Beta": "realtime=v1",
          },
        }
      );

      openAISocket.onopen = () => {
        console.log("Connected to OpenAI Realtime API");
      };

      openAISocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("OpenAI message:", data.type);
        
        // Send session.update after receiving session.created
        if (data.type === 'session.created') {
          const sessionUpdate = {
            type: 'session.update',
            session: {
              modalities: ["text", "audio"],
              instructions: `You are the AI concierge for a luxury medical aesthetics clinic. Be warm, professional, and elegant in your responses. Follow this conversation flow:

Greeting: "Thank you for calling. This is the concierge desk. How can I help support your aesthetic goals today?"

For pricing inquiries: "Pricing depends on your personalized treatment plan. I can help you schedule a consultation for exact recommendations."

For treatment inquiries: "I can share a simple overview, and your provider will guide you through all clinical details during the consultation."

When booking: "We have openings this week and next. What day works best for you?"

If they're undecided: "Most clients begin with a consultation so we can understand your goals and tailor the right approach."

Always try to guide toward booking: "Would you like me to secure a consultation time for you now?"

Be concise, elegant, and guide every conversation toward scheduling a consultation.`,
              voice: "alloy",
              input_audio_format: "pcm16",
              output_audio_format: "pcm16",
              input_audio_transcription: {
                model: "whisper-1"
              },
              turn_detection: {
                type: "server_vad",
                threshold: 0.5,
                prefix_padding_ms: 300,
                silence_duration_ms: 1000
              },
              temperature: 0.8,
              max_response_output_tokens: "inf"
            }
          };
          openAISocket?.send(JSON.stringify(sessionUpdate));
          console.log("Session update sent");
        }
        
        // Forward all messages to client
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(event.data);
        }
      };

      openAISocket.onerror = (error) => {
        console.error("OpenAI WebSocket error:", error);
        socket.close();
      };

      openAISocket.onclose = () => {
        console.log("OpenAI WebSocket closed");
        socket.close();
      };
    };

    socket.onmessage = (event) => {
      if (openAISocket?.readyState === WebSocket.OPEN) {
        openAISocket.send(event.data);
      }
    };

    socket.onerror = (error) => {
      console.error("Client WebSocket error:", error);
      openAISocket?.close();
    };

    socket.onclose = () => {
      console.log("Client WebSocket closed");
      openAISocket?.close();
    };

    return response;
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
