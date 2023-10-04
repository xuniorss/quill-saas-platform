import { ChevronLeft, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { ReactElement, ReactNode } from 'react'
import { buttonVariants } from '../ui/button'

interface ChatFeedbackProps {
	title: string
	description: string | ReactElement
	isLoading: boolean
	children?: ReactNode
}

export const ChatFeedback = ({
	title,
	description,
	isLoading,
	children,
}: ChatFeedbackProps) => {
	return (
		<div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
			<div className="mb-28 flex flex-1 flex-col items-center justify-center">
				<div className="flex flex-col items-center gap-2">
					{isLoading && (
						<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
					)}
					{!isLoading && <XCircle className="h-8 w-8 text-red-500" />}
					<h3 className="text-xl font-semibold">{title}</h3>
					<p className="text-sm text-zinc-500">{description}</p>
					{typeof description !== 'string' && (
						<Link
							href="/dashboard"
							className={buttonVariants({
								variant: 'secondary',
								className: 'mt-4',
							})}
						>
							<ChevronLeft className="mr-1.5 h-3 w-3" />
							Voltar
						</Link>
					)}
				</div>
			</div>
			{children && <>{children}</>}
		</div>
	)
}
