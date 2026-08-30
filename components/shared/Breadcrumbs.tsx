import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={index} className="flex items-center space-x-2">
            {index > 0 && <span>/</span>}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-emerald-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground font-semibold" : ""}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
