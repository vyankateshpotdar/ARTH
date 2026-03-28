import { useState } from "react";
import { useNavigate } from "react-router";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion } from "motion/react";
import { ArrowLeft, Check } from "lucide-react";

export function AddExpense() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [note, setNote] = useState("");

  const categories = [
    { id: "food", label: "Food", emoji: "🍔", color: "from-orange-500 to-red-500" },
    { id: "transport", label: "Transport", emoji: "🚗", color: "from-blue-500 to-cyan-500" },
    { id: "shopping", label: "Shopping", emoji: "🛍️", color: "from-pink-500 to-purple-500" },
    { id: "entertainment", label: "Fun", emoji: "🎮", color: "from-purple-500 to-indigo-500" },
    { id: "bills", label: "Bills", emoji: "💡", color: "from-yellow-500 to-orange-500" },
    { id: "health", label: "Health", emoji: "💊", color: "from-green-500 to-emerald-500" },
    { id: "education", label: "Learning", emoji: "📚", color: "from-indigo-500 to-purple-500" },
    { id: "other", label: "Other", emoji: "📦", color: "from-gray-500 to-slate-500" },
  ];

  const handleSave = () => {
    // Save expense logic here
    navigate("/home");
  };

  return (
    <div className="min-h-screen p-4 pt-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Add Expense</h1>
          <p className="text-white/60 text-sm">Track your spending</p>
        </div>
      </div>

      {/* Amount Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassCard gradient glow className="mb-6">
          <label className="text-white/80 text-sm mb-2 block">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-white/80">
              ₹
            </span>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="pl-12 h-20 text-4xl bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-2xl text-center font-bold"
              autoFocus
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* Category Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <label className="text-white/80 text-sm mb-3 block">Category</label>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="relative"
              >
                <GlassCard
                  className={`p-0 h-24 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-br " + category.color + " shadow-[0_0_20px_rgba(127,90,240,0.4)] scale-105"
                      : "hover:scale-105"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <Check className="w-3 h-3 text-purple-600" />
                    </div>
                  )}
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="text-xs text-white">{category.label}</span>
                </GlassCard>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <GlassCard>
          <label className="text-white/80 text-sm mb-2 block">
            Note (Optional)
          </label>
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did you buy?"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12 rounded-2xl"
          />
        </GlassCard>
      </motion.div>

      {/* Quick amounts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <label className="text-white/80 text-sm mb-3 block">Quick Add</label>
        <div className="grid grid-cols-4 gap-2">
          {[50, 100, 200, 500].map((value) => (
            <Button
              key={value}
              onClick={() => setAmount(value.toString())}
              variant="outline"
              className="h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl"
            >
              ₹{value}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={handleSave}
          disabled={!amount || !selectedCategory}
          className="w-full h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl shadow-[0_0_20px_rgba(127,90,240,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-5 h-5 mr-2" />
          Save Expense
        </Button>
      </motion.div>
    </div>
  );
}
