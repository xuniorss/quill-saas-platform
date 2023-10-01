import Link, { LinkProps } from 'next/link'

interface StepLinkProps extends LinkProps {
	label: string
}

export const StepLink = ({ label, href, ...props }: StepLinkProps) => {
	return (
		<Link
			href={href}
			className="text-blue-700 underline underline-offset-2"
			{...props}
		>
			{label}
		</Link>
	)
}
