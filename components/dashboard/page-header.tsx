interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0 max-w-2xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex shrink-0 items-center gap-2">{children}</div>
      )}
    </div>
  )
}
