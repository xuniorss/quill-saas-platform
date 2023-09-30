import { cn } from '@/lib/utils'
import { ComponentProps, ReactNode } from 'react'

interface MaxWidthWrapperProps extends ComponentProps<'section'> {
	children: ReactNode
}

export const MaxWidthWrapper = ({
	children,
	className,
	...props
}: MaxWidthWrapperProps) => {
	return (
		<section
			className={cn(
				'mx-auto w-full max-w-screen-xl px-2.5 md:px-20',
				className,
			)}
			{...props}
		>
			{children}
		</section>
	)
}
