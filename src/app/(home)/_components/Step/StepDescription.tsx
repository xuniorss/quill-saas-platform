import { ReactNode } from 'react'

interface StepDescriptionProps {
	description: string
	children?: ReactNode
}

export const StepDescription = ({
	description,
	children,
}: StepDescriptionProps) => {
	return (
		<span className="mt-2 text-zinc-700">
			{description}
			{children && <> {children}</>}.
		</span>
	)
}
