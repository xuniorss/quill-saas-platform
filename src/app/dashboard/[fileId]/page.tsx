import { PdfRenderer } from '@/components/PdfRenderer'
import { ChatWrapper } from '@/components/chat/chat-wrapper'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound, redirect } from 'next/navigation'

interface PageProps {
	params: { fileId: string }
}

export default async function FileIdPage({ params }: PageProps) {
	const { getUser } = getKindeServerSession()
	const user = getUser()

	if (!user || !user.id)
		return redirect(`/auth-callback?origin=dashboard/${params.fileId}`)

	const file = await db.file.findFirst({
		where: { id: params.fileId, userId: user.id },
	})

	if (!file) notFound()

	return (
		<section className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
			<div className="max-w-8xl mx-auto w-full grow lg:flex xl:px-2">
				<div className="flex-1 xl:flex">
					<div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
						<PdfRenderer url={file.url} />
					</div>
				</div>
				<div className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
					<ChatWrapper isSubscribed={plan.isSubscribed} fileId={file.id} />
				</div>
			</div>
		</section>
	)
}
