export default function PageContainer({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 md:py-8 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}