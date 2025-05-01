import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export function GradientButton({ children, className, variant = "primary", ...props }: GradientButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md px-4 py-2 font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary"
          ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 focus:ring-purple-500"
          : "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 focus:ring-orange-500",
        className,
      )}
      {...props}
    >
      <span className="relative">{children}</span>
    </button>
  )
}
