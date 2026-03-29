import { ReactNode } from "react";
import { cn } from "./ui/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, gradient, glow, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6",
        gradient && "bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10",
        glow && "shadow-[0_0_30px_rgba(127,90,240,0.3)]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
