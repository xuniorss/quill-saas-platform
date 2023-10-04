'use client'

import { trpc } from '@/app/_trpc/client'
import { Loader2 } from 'lucide-react'
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
			<div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
				<div className="mb-28 flex flex-1 flex-col items-center justify-center">
					<div className="flex flex-col items-center gap-2">
						<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
						<h3 className="text-xl font-semibold">Carregando...</h3>
						<p className="text-sm text-zinc-500">
							Estamos preparando seu PDF
						</p>
					</div>
				</div>
				<ChatInput />
			</div>
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
