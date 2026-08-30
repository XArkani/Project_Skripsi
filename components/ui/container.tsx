import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends ComponentProps<"div"> {
  as?: "div" | "section" | "header" | "footer"
}

export default function Container({
  as: Comp = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
}