import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Info, TrendingUp, Users, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROICalculator = () => {
  const [activePatients, setActivePatients] = useState(100);
  const [avgRevenue, setAvgRevenue] = useState(1500);
  const [retentionRate, setRetentionRate] = useState(60);
  const [referralRate, setReferralRate] = useState(10);
  const [treatmentsPerYear, setTreatmentsPerYear] = useState(3);
  const [treatmentCost, setTreatmentCost] = useState(500);

  // AI improvement estimates
  const aiRetentionBoost = 15; // 10-20% improvement
  const aiReferralBoost = 20; // 15-25% improvement
  
  const currentMonthlyRevenue = (activePatients * avgRevenue * treatmentsPerYear) / 12;
  const improvedRetention = Math.min(retentionRate + aiRetentionBoost, 95);
  const improvedReferral = Math.min(referralRate + aiReferralBoost, 40);
  
  const potentialMonthlyRevenue = currentMonthlyRevenue * (1 + (aiRetentionBoost/100 + aiReferralBoost/100));
  const monthlyIncrease = potentialMonthlyRevenue - currentMonthlyRevenue;
  const annualValue = monthlyIncrease * 12;
  const percentIncrease = ((monthlyIncrease / currentMonthlyRevenue) * 100).toFixed(1);

  return (
    <section id="calculator" className="py-32 bg-clinical-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--luxury-gold)/0.1)_0%,transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Medical Aesthetics ROI Calculator
          </h2>
          <p className="text-xl text-muted-foreground">
            See how AI-powered patient engagement can transform your practice
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left side - Metrics Input */}
          <Card className="shadow-luxury border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-luxury-bronze" />
                Practice Metrics
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Adjust the sliders below to match your practice's current performance
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    Active Patients
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </label>
                  <span className="text-lg font-semibold text-luxury-bronze">{activePatients}</span>
                </div>
                <Slider
                  value={[activePatients]}
                  onValueChange={(v) => setActivePatients(v[0])}
                  min={50}
                  max={500}
                  step={10}
                  className="cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    Average Annual Revenue Per Patient ($)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </label>
                  <span className="text-lg font-semibold text-luxury-bronze">${avgRevenue.toLocaleString()}</span>
                </div>
                <Slider
                  value={[avgRevenue]}
                  onValueChange={(v) => setAvgRevenue(v[0])}
                  min={500}
                  max={5000}
                  step={100}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    Current Patient Retention Rate (%)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </label>
                  <span className="text-lg font-semibold text-luxury-bronze">{retentionRate}%</span>
                </div>
                <Slider
                  value={[retentionRate]}
                  onValueChange={(v) => setRetentionRate(v[0])}
                  min={30}
                  max={95}
                  step={5}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    Current Referral Rate (%)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </label>
                  <span className="text-lg font-semibold text-luxury-bronze">{referralRate}%</span>
                </div>
                <Slider
                  value={[referralRate]}
                  onValueChange={(v) => setReferralRate(v[0])}
                  min={5}
                  max={40}
                  step={5}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    Average Treatments Per Year
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </label>
                  <span className="text-lg font-semibold text-luxury-bronze">{treatmentsPerYear}</span>
                </div>
                <Slider
                  value={[treatmentsPerYear]}
                  onValueChange={(v) => setTreatmentsPerYear(v[0])}
                  min={1}
                  max={12}
                  step={1}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    Average Treatment Cost ($)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </label>
                  <span className="text-lg font-semibold text-luxury-bronze">${treatmentCost}</span>
                </div>
                <Slider
                  value={[treatmentCost]}
                  onValueChange={(v) => setTreatmentCost(v[0])}
                  min={200}
                  max={2000}
                  step={50}
                />
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  AI-powered patient engagement typically improves retention by 10-20% and referrals by 15-25% through personalized, consistent follow-ups and engagement.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right side - Results */}
          <div className="space-y-6">
            <Card className="shadow-luxury border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-luxury-bronze" />
                  Your Potential Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Monthly Revenue</div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">${currentMonthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-luxury-bronze/30" style={{ width: '100%' }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Current</div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-luxury-bronze">${potentialMonthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full gradient-luxury" style={{ width: '100%' }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">With AI</div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Retention Rate</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold">{improvedRetention}%</span>
                      <span className="text-xs text-green-600">+{aiRetentionBoost}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Current: {retentionRate}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Referral Rate</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold">{improvedReferral}%</span>
                      <span className="text-xs text-green-600">+{aiReferralBoost}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Current: {referralRate}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Current Monthly Revenue</div>
                    <div className="text-2xl font-bold">${currentMonthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                    <div className="text-sm text-green-800 dark:text-green-200 mb-1">Potential Monthly Revenue</div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300 flex items-center gap-2">
                      ${potentialMonthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      <span className="text-xs bg-green-200 dark:bg-green-900 px-2 py-1 rounded">+{percentIncrease}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-luxury text-primary-foreground shadow-luxury">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Monthly Revenue Increase</div>
                    <div className="text-4xl font-bold">${monthlyIncrease.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="text-3xl font-bold opacity-90">+{percentIncrease}%</div>
                </div>
                <p className="text-sm opacity-90 mb-6">
                  By implementing AI-powered patient engagement
                </p>
                <div className="h-1 bg-primary-foreground/20 rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-primary-foreground" style={{ width: `${Math.min(parseFloat(percentIncrease), 100)}%` }}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Estimated ROI</div>
                    <div className="text-2xl font-bold">-13%</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Annual Value</div>
                    <div className="text-2xl font-bold">${annualValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Retention Improvement</div>
                  <p className="text-sm text-muted-foreground">
                    Increase retention rate from {retentionRate}% to {improvedRetention}% through personalized follow-ups and treatment reminders
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Referral Growth</div>
                  <p className="text-sm text-muted-foreground">
                    Boost referral rate from {referralRate}% to {improvedReferral}% by engaging satisfied patients at the optimal time
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Patient Lifetime Value</div>
                  <p className="text-sm text-muted-foreground">
                    Maximize revenue per patient through consistent engagement and personalized treatment recommendations
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full gradient-luxury text-primary-foreground shadow-luxury text-lg py-6">
              <DollarSign className="w-5 h-5 mr-2" />
              Get Your Free AI Automation Assessment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
