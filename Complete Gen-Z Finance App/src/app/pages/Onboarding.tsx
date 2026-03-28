import { useState } from "react";
import { useNavigate } from "react-router";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Slider } from "../components/ui/slider";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState("");
  const [spending, setSpending] = useState([50]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { id: "emergency", label: "Emergency Fund", emoji: "🛡️" },
    { id: "vacation", label: "Dream Vacation", emoji: "🏖️" },
    { id: "car", label: "Buy a Car", emoji: "🚗" },
    { id: "house", label: "Own a Home", emoji: "🏠" },
    { id: "invest", label: "Start Investing", emoji: "📈" },
    { id: "business", label: "Start Business", emoji: "💼" },
  ];

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/home");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  s <= step
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <p className="text-white/60 text-sm text-center">Step {step} of 3</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_30px_rgba(127,90,240,0.5)] mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  What's your monthly income?
                </h2>
                <p className="text-white/60">
                  Help us understand your financial situation
                </p>
              </div>

              <GlassCard gradient glow>
                <div className="space-y-4">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-white/80">
                      ₹
                    </span>
                    <Input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="50000"
                      className="pl-10 h-16 text-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-2xl text-center"
                    />
                  </div>
                  <p className="text-white/40 text-sm text-center">
                    Don't worry, this is private and secure 🔒
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">💸</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  How much do you spend monthly?
                </h2>
                <p className="text-white/60">Slide to adjust your average spending</p>
              </div>

              <GlassCard gradient glow>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {spending[0]}%
                    </div>
                    <p className="text-white/60">of your income</p>
                  </div>

                  <Slider
                    value={spending}
                    onValueChange={setSpending}
                    max={100}
                    step={5}
                    className="py-4"
                  />

                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        spending[0] <= 30
                          ? "bg-green-500/20 text-green-400"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      <div className="font-semibold">Saver</div>
                      <div className="text-xs">0-30%</div>
                    </div>
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        spending[0] > 30 && spending[0] <= 70
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      <div className="font-semibold">Balanced</div>
                      <div className="text-xs">30-70%</div>
                    </div>
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        spending[0] > 70
                          ? "bg-pink-500/20 text-pink-400"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      <div className="font-semibold">YOLO</div>
                      <div className="text-xs">70-100%</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  What are your goals?
                </h2>
                <p className="text-white/60">Select all that apply</p>
              </div>

              <GlassCard gradient glow>
                <div className="grid grid-cols-2 gap-3">
                  {goals.map((goal) => {
                    const isSelected = selectedGoals.includes(goal.id);
                    return (
                      <button
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          isSelected
                            ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50 shadow-[0_0_20px_rgba(127,90,240,0.4)]"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="text-3xl mb-2">{goal.emoji}</div>
                        <div className="text-sm text-white">{goal.label}</div>
                      </button>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 h-14 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-2xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className={`h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl shadow-[0_0_20px_rgba(127,90,240,0.4)] transition-all duration-300 ${
              step === 1 ? "w-full" : "flex-1"
            }`}
          >
            {step === 3 ? "Start Living Smart" : "Continue"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
