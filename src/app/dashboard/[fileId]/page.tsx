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

	return <div>{params.fileId}</div>
}
