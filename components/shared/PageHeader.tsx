interface PageHeaderProps {
  badge: string
  title: string
  description: string
}

export default function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <div className="text-center space-y-4 mb-12">
      <span className="inline-block text-emerald-700 font-semibold text-sm uppercase tracking-wider">
        {badge}
      </span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
        {title}
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
        {description}
      </p>
    </div>
  )
}
