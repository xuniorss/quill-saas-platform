'use client'

import { trpc } from '@/app/_trpc/client'
import { ChatFeedback } from './chat-feedback'
import { ChatInput } from './chat-input'
import { Messages } from './messages'

export const ChatWrapper = ({
	isSubscribed,
	fileId,
}: {
	isSubscribed: boolean
	fileId: string
}) => {
	const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
		{ fileId },
		{
			refetchInterval: (data) =>
				data?.status === 'SUCCESS' || data?.status === 'FAILED'
					? false
					: 500,
		},
	)

	if (isLoading) {
		return (
			<ChatFeedback
				title="Carregando..."
				description="Estamos preparando seu PDF."
				isLoading
			>
				<ChatInput isDisabled />
			</ChatFeedback>
		)
	}

	if (data?.status === 'PROCESSING') {
		return (
			<ChatFeedback
				title="Processando PDF..."
				description="Isso não demorará muito."
				isLoading
			>
				<ChatInput isDisabled />
			</ChatFeedback>
		)
	}

	if (data?.status === 'FAILED') {
		return (
			<ChatFeedback
				title="Muitas páginas em PDF"
				description={
					<>
						Seu plano <span className="font-medium">gratuito</span>{' '}
						suporta até 5 páginas por PDF.
					</>
				}
				isLoading={false}
			>
				<ChatInput isDisabled />
			</ChatFeedback>
		)
	}

	return (
		<section className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
			<div className="mb-28 flex flex-1 flex-col justify-between">
				<Messages />
			</div>
			<ChatInput />
		</section>
	)
}
