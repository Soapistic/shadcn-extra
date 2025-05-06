'use client";'
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";

const loaderVariants = cva("inline-flex items-center justify-center gap-2", {
  variants: {
    size: {
      sm: "h-4 w-4 text-xs",
      md: "h-6 w-6 text-sm",
      lg: "h-8 w-8 text-base",
      xl: "h-10 w-10 text-base",
    },
    variant: {
      default: "text-primary",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
    layout: {
      icon: "flex-row",
      withText: "flex-row",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    layout: "icon",
  },
});

interface LoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string;
  "aria-label"?: string;
  text?: string;
  textStyle?: React.CSSProperties;
  show?: boolean;
  delayMs?: number;
}

export function Loader({
  size,
  textStyle,
  variant,
  layout,
  className,
  text,
  "aria-label": ariaLabel = "Loading",
  show = true,
  delayMs = 0,
}: LoaderProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <AnimatePresence>
        {show && (
          <motion.div
            className={cn(loaderVariants({ size, variant, layout }), className)}
            role="status"
            aria-label={ariaLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: delayMs / 1000 }}
          >
            <svg
              className={cn(
                "animate-spin",
                loaderVariants({ size }).split(" ")[0]
              )}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      {layout === "withText" && text && <span style={textStyle}>{text}</span>}
    </div>
  );
}
