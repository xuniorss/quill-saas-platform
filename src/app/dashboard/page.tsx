import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
	const { getUser } = getKindeServerSession()
	const user = getUser()

	if (!user || !user.id) return redirect('/auth-callback?origin=dashboard')

	const dbUser = await db.user.findUnique({ where: { id: user.id } })

	if (!dbUser) return redirect('/auth-callback?origin=dashboard')

	return <div></div>
}
