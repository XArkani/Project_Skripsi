import { cn } from "@/lib/utils"

export default function PageContainer({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "page-gutter mx-auto w-full max-w-[1400px] pt-7 pb-24 md:py-8",
        className
      )}
    >
      {children}
    </div>
  )
}
