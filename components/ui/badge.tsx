import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        ADMIN:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        USER:"border-transparent bg-yellow-600 text-white hover:bg-yellow-600/40",
        PREMIUM_USER:"border-transparent bg-indigo-500 text-white hover:bg-indigo-500/40",
        PUBLISHED:"bg-[#03dc7a] text-[#fff]",
        UNPUBLISHED:"bg-yellow-600 text-[#fff]",
        ARCHIVED:"bg-[#ff0000] text-[#fff]",
        EASY:"bg-[#03dc7a] text-[#fff]",
        MEDIUM:"border-transparent bg-yellow-600 text-white hover:bg-yellow-600/40",
        HARD:"bg-[#ff0000] text-[#fff]",
        PREMIUM:"bg-indigo-500 text-white"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
