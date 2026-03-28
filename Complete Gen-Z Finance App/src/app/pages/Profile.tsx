import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { motion } from "motion/react";
import {
  User,
  Bell,
  Lock,
  Sparkles,
  HelpCircle,
  LogOut,
  ChevronRight,
  Award,
  TrendingUp,
  Target,
  Flame,
  Settings,
  CreditCard,
  Shield,
} from "lucide-react";

export function Profile() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const userStats = [
    { label: "Level", value: "5", icon: Award, color: "from-yellow-500 to-orange-500" },
    { label: "XP", value: "1,250", icon: Sparkles, color: "from-purple-500 to-pink-500" },
    { label: "Streak", value: "14 days", icon: Flame, color: "from-red-500 to-orange-500" },
    { label: "Goals", value: "4/6", icon: Target, color: "from-green-500 to-emerald-500" },
  ];

  const badges = [
    { id: "1", emoji: "🎯", name: "Smart Saver" },
    { id: "2", emoji: "👑", name: "Budget Boss" },
    { id: "3", emoji: "🔥", name: "Streak Master" },
    { id: "4", emoji: "⚡", name: "Goal Crusher" },
    { id: "5", emoji: "💎", name: "Diamond Tier" },
    { id: "6", emoji: "🚀", name: "Early Adopter" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen p-4 pt-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-white/60">Manage your account</p>
        </motion.div>
      </div>

      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard gradient glow className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(127,90,240,0.5)]">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">Alex Kumar</h2>
              <p className="text-white/60 text-sm">alex.kumar@email.com</p>
            </div>
            <button className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {userStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-semibold text-sm">{stat.value}</p>
                  <p className="text-white/60 text-xs">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="text-white font-semibold mb-3">Your Badges 🏆</h3>
        <GlassCard>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-3xl">{badge.emoji}</span>
                <span className="text-white/80 text-xs text-center">{badge.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
        <GlassCard className="divide-y divide-white/10">
          <Link to="/insights">
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-white">View Insights</span>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>
          </Link>

          <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-white">Linked Accounts</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-b-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-white">Security</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </button>
        </GlassCard>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h3 className="text-white font-semibold mb-3">Settings</h3>
        <GlassCard className="divide-y divide-white/10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-white">Notifications</p>
                <p className="text-white/40 text-xs">Get spending alerts</p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white">Auto-Save</p>
                <p className="text-white/40 text-xs">Automatic savings</p>
              </div>
            </div>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>

          <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-red-400" />
              </div>
              <span className="text-white">Privacy</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-b-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-white">Help & Support</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </button>
        </GlassCard>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-14 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-2xl flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </motion.div>

      {/* Version */}
      <p className="text-center text-white/40 text-sm mt-6">FlowFi v1.0.0</p>
    </div>
  );
}
