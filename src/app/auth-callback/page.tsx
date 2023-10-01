'use client'

import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'

export default function AuthCallbackPage() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const origin = searchParams.get('origin')

	const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
		onSuccess: ({ success }) => {
			if (success) router.push(origin ? `/${origin}` : '/dashboard')
		},
		onError: (err) => {
			if (err.data?.code === 'UNAUTHORIZED') {
				router.push('/sign-in')
			}
		},
		retry: true,
		retryDelay: 500,
	})

	return (
		<article className="mt-24 flex w-full justify-center">
			<div className="flex flex-col items-center gap-2">
				<Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
				<h3 className="text-xl font-semibold">Configurando sua conta...</h3>
				<p>Você será redirecionado automaticamente.</p>
			</div>
		</article>
	)
}
