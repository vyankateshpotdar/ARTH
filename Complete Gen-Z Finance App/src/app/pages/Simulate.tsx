import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function Simulate() {
  const [balance, setBalance] = useState(50000);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  // Mock data for charts
  const cryptoData = [
    { time: "10:00", BTC: 65000, ETH: 3200, SOL: 145 },
    { time: "12:00", BTC: 65500, ETH: 3250, SOL: 148 },
    { time: "14:00", BTC: 64800, ETH: 3180, SOL: 144 },
    { time: "16:00", BTC: 66200, ETH: 3300, SOL: 152 },
    { time: "18:00", BTC: 66800, ETH: 3350, SOL: 155 },
  ];

  const stockData = [
    { time: "Mon", AAPL: 178, TSLA: 242, GOOGL: 141 },
    { time: "Tue", AAPL: 180, TSLA: 245, GOOGL: 143 },
    { time: "Wed", AAPL: 179, TSLA: 240, GOOGL: 142 },
    { time: "Thu", AAPL: 182, TSLA: 248, GOOGL: 145 },
    { time: "Fri", AAPL: 185, TSLA: 252, GOOGL: 147 },
  ];

  const cryptoAssets = [
    { id: "BTC", name: "Bitcoin", symbol: "BTC", price: 66800, change: 2.8, color: "#F7931A" },
    { id: "ETH", name: "Ethereum", symbol: "ETH", price: 3350, change: 4.7, color: "#627EEA" },
    { id: "SOL", name: "Solana", symbol: "SOL", price: 155, change: 6.9, color: "#14F195" },
    { id: "BNB", name: "Binance", symbol: "BNB", price: 325, change: -1.2, color: "#F3BA2F" },
  ];

  const stocks = [
    { id: "AAPL", name: "Apple Inc.", symbol: "AAPL", price: 185, change: 3.9, color: "#A2AAAD" },
    { id: "TSLA", name: "Tesla Inc.", symbol: "TSLA", price: 252, change: 4.1, color: "#E82127" },
    { id: "GOOGL", name: "Alphabet", symbol: "GOOGL", price: 147, change: 4.3, color: "#4285F4" },
    { id: "MSFT", name: "Microsoft", symbol: "MSFT", price: 378, change: -0.5, color: "#00A4EF" },
  ];

  const handleBuy = () => {
    // Mock buy action
    setBalance(balance - 1000);
  };

  const handleSell = () => {
    // Mock sell action
    setBalance(balance + 1000);
  };

  return (
    <div className="min-h-screen p-4 pt-8 max-w-lg mx-auto pb-24">
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Simulation Lab</h1>
          <p className="text-white/60">Practice investing risk-free</p>
        </motion.div>
      </div>

      {/* Practice Mode Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="mb-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Practice Mode</h3>
              <p className="text-white/60 text-sm">No real money involved</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Balance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard gradient glow className="mb-6">
          <p className="text-white/60 text-sm mb-1">Practice Balance</p>
          <h2 className="text-4xl font-bold text-white mb-2">
            ₹{balance.toLocaleString()}
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+3,250 (6.9%)</span>
            </div>
            <span className="text-white/40 text-sm">Today</span>
          </div>
        </GlassCard>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="crypto" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 mb-6">
            <TabsTrigger
              value="crypto"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              Crypto
            </TabsTrigger>
            <TabsTrigger
              value="stocks"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              Stocks
            </TabsTrigger>
            <TabsTrigger
              value="forex"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              Forex
            </TabsTrigger>
            <TabsTrigger
              value="sip"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              SIP
            </TabsTrigger>
          </TabsList>

          {/* Crypto Tab */}
          <TabsContent value="crypto" className="space-y-4">
            {/* Chart */}
            <GlassCard>
              <h3 className="text-white font-semibold mb-4">Market Overview</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={cryptoData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                  <Line type="monotone" dataKey="BTC" stroke="#F7931A" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="ETH" stroke="#627EEA" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="SOL" stroke="#14F195" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Assets List */}
            <div className="space-y-3">
              {cryptoAssets.map((asset) => (
                <GlassCard
                  key={asset.id}
                  className={`cursor-pointer transition-all ${
                    selectedAsset === asset.id
                      ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50"
                      : "hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedAsset(asset.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${asset.color}20` }}
                      >
                        <DollarSign className="w-5 h-5" style={{ color: asset.color }} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{asset.symbol}</h4>
                        <p className="text-white/60 text-sm">{asset.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        ${asset.price.toLocaleString()}
                      </p>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          asset.change >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {asset.change >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(asset.change)}%</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Stocks Tab */}
          <TabsContent value="stocks" className="space-y-4">
            {/* Chart */}
            <GlassCard>
              <h3 className="text-white font-semibold mb-4">Market Overview</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                  <Line type="monotone" dataKey="AAPL" stroke="#A2AAAD" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="TSLA" stroke="#E82127" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="GOOGL" stroke="#4285F4" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Stocks List */}
            <div className="space-y-3">
              {stocks.map((stock) => (
                <GlassCard
                  key={stock.id}
                  className={`cursor-pointer transition-all ${
                    selectedAsset === stock.id
                      ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50"
                      : "hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedAsset(stock.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${stock.color}20` }}
                      >
                        <BarChart3 className="w-5 h-5" style={{ color: stock.color }} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{stock.symbol}</h4>
                        <p className="text-white/60 text-sm">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        ${stock.price.toLocaleString()}
                      </p>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          stock.change >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stock.change >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(stock.change)}%</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Forex Tab */}
          <TabsContent value="forex">
            <GlassCard className="text-center py-12">
              <div className="text-5xl mb-4">💱</div>
              <h3 className="text-white font-semibold mb-2">Forex Trading</h3>
              <p className="text-white/60">Coming soon! Practice currency trading.</p>
            </GlassCard>
          </TabsContent>

          {/* SIP Tab */}
          <TabsContent value="sip">
            <GlassCard className="text-center py-12">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-white font-semibold mb-2">SIP Calculator</h3>
              <p className="text-white/60">Coming soon! Plan your investments.</p>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Buy/Sell Actions */}
      {selectedAsset && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-0 right-0 px-4"
        >
          <div className="max-w-lg mx-auto">
            <GlassCard gradient glow>
              <div className="flex gap-3">
                <Button
                  onClick={handleBuy}
                  className="flex-1 h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl shadow-[0_0_20px_rgba(44,182,125,0.4)]"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Buy
                </Button>
                <Button
                  onClick={handleSell}
                  className="flex-1 h-14 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-2xl shadow-[0_0_20px_rgba(255,77,141,0.4)]"
                >
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Sell
                </Button>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      )}
    </div>
  );
}
