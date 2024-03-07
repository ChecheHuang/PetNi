import { cn } from '@/lib/utils'

function MobileTopNavbarContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const mobileTopNavbarContainerClassName = 'h-[62px]  w-full  bg-white'

  return (
    <div className="md:hidden">
      <div
        className={cn(
          'fixed top-0 z-10   ',
          mobileTopNavbarContainerClassName,
          className,
        )}
      >
        {children}
      </div>
      <div className={cn(mobileTopNavbarContainerClassName, className)}></div>
    </div>
  )
}

export default MobileTopNavbarContainer
