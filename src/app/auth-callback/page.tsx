'use client'

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
}