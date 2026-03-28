import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Award, Flame, Target } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function Insights() {
  const [period, setPeriod] = useState("week");

  // Mock data
  const spendingData = [
    { day: "Mon", income: 2000, expense: 850 },
    { day: "Tue", income: 0, expense: 1200 },
    { day: "Wed", income: 0, expense: 650 },
    { day: "Thu", income: 3000, expense: 980 },
    { day: "Fri", income: 0, expense: 1500 },
    { day: "Sat", income: 0, expense: 2200 },
    { day: "Sun", income: 0, expense: 780 },
  ];

  const categoryData = [
    { name: "Food", value: 8500, color: "#F59E0B" },
    { name: "Transport", value: 3200, color: "#3B82F6" },
    { name: "Shopping", value: 6800, color: "#EC4899" },
    { name: "Entertainment", value: 2500, color: "#8B5CF6" },
    { name: "Bills", value: 4200, color: "#10B981" },
  ];

  const achievements = [
    {
      id: "1",
      title: "Smart Saver",
      description: "Saved 30% this month",
      emoji: "🎯",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "2",
      title: "Budget Boss",
      description: "Stayed under budget for 7 days",
      emoji: "👑",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "3",
      title: "Streak Master",
      description: "14-day saving streak",
      emoji: "🔥",
      color: "from-red-500 to-pink-500",
    },
    {
      id: "4",
      title: "Goal Crusher",
      description: "Completed 2 savings goals",
      emoji: "⚡",
      color: "from-purple-500 to-blue-500",
    },
  ];

  const stats = [
    { label: "Total Income", value: "₹50,000", change: "+12%", trend: "up" },
    { label: "Total Expense", value: "₹25,160", change: "-8%", trend: "down" },
    { label: "Net Savings", value: "₹24,840", change: "+18%", trend: "up" },
    { label: "Avg. Daily Spend", value: "₹1,180", change: "-5%", trend: "down" },
  ];

  return (
    <div className="min-h-screen p-4 pt-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Insights</h1>
          <p className="text-white/60">Your financial analytics</p>
        </motion.div>
      </div>

      {/* Period Selector */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex gap-2">
          {["week", "month", "year"].map((p) => (
            <Button
              key={p}
              onClick={() => setPeriod(p)}
              variant="outline"
              className={`flex-1 h-10 rounded-xl transition-all ${
                period === p
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="p-4">
            <p className="text-white/60 text-xs mb-1">{stat.label}</p>
            <h3 className="text-white font-bold text-xl mb-1">{stat.value}</h3>
            <div
              className={`flex items-center gap-1 text-xs ${
                stat.trend === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {stat.trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{stat.change}</span>
            </div>
          </GlassCard>
        ))}
      </motion.div>

      {/* Gamification Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard gradient glow className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Your Status</p>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Smart Saver
              </h2>
            </div>
            <div className="text-5xl">🏆</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-white text-sm">14-day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-white text-sm">Level 5</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Tabs defaultValue="trend" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 mb-4">
            <TabsTrigger
              value="trend"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              Trend
            </TabsTrigger>
            <TabsTrigger
              value="breakdown"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              Breakdown
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trend">
            <GlassCard>
              <h3 className="text-white font-semibold mb-4">Income vs Expense</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#2CB67D" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expense" fill="#FF4D8D" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>
          </TabsContent>

          <TabsContent value="breakdown">
            <GlassCard>
              <h3 className="text-white font-semibold mb-4">Spending by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <h3 className="text-white font-semibold mb-4">Achievements 🏆</h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <GlassCard
              key={achievement.id}
              className={`bg-gradient-to-br ${achievement.color} bg-opacity-10 border-opacity-30 text-center p-4`}
            >
              <div className="text-4xl mb-2">{achievement.emoji}</div>
              <h4 className="text-white font-semibold text-sm mb-1">
                {achievement.title}
              </h4>
              <p className="text-white/60 text-xs">{achievement.description}</p>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Insights Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <div className="flex gap-3">
            <Target className="w-6 h-6 text-purple-400 flex-shrink-0" />
            <div>
              <h4 className="text-white font-semibold mb-1">Keep It Up! 🎯</h4>
              <p className="text-white/80 text-sm mb-2">
                You're doing amazing! Your savings rate increased by 18% this month.
              </p>
              <p className="text-white/60 text-xs">
                Tip: Try saving just ₹100 more daily to reach your emergency fund
                goal 2 weeks earlier!
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
