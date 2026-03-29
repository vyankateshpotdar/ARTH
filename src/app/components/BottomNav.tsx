import { Link, useLocation } from "react-router";
import { Home, PieChart, Target, Rocket, User } from "lucide-react";
import { cn } from "./ui/utils";

export function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: PieChart, label: "Budget", path: "/budget" },
    { icon: Target, label: "Goals", path: "/goals" },
    { icon: Rocket, label: "Simulate", path: "/simulate" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="max-w-lg mx-auto px-4 pb-4">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl px-4 py-3 shadow-[0_0_40px_rgba(127,90,240,0.4)]">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center gap-1 min-w-[60px] group"
                >
                  <div
                    className={cn(
                      "p-2.5 rounded-2xl transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_20px_rgba(127,90,240,0.6)]"
                        : "bg-transparent group-hover:bg-white/10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] transition-colors",
                      isActive ? "text-white font-semibold" : "text-white/60"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
