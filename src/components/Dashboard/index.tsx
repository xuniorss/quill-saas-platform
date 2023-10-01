'use client'

import { trpc } from '@/app/_trpc/client'
import { Ghost } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import { UploadButton } from '../UploadButton'
import { FileList } from './file-list'

export const Dashboard = () => {
	const { data: files, isLoading } = trpc.getUserFiles.useQuery()

	return (
		<main className="mx-auto max-w-7xl md:p-10">
			<section className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
				<h1 className="mb-3 text-5xl font-bold text-gray-900">
					Meus arquivos
				</h1>

				<UploadButton />
			</section>
			{files && files?.length !== 0 ? (
				<ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
					{files
						.sort(
							(a, b) =>
								new Date(b.createdAt).getTime() -
								new Date(a.createdAt).getTime(),
						)
						.map((file) => (
							<FileList key={file.id} file={file} />
						))}
				</ul>
			) : isLoading ? (
				<Skeleton height={100} className="my-2" count={3} />
			) : (
				<div className="mt-16 flex flex-col items-center gap-2">
					<Ghost className="h-8 w-8 text-zinc-800" />
					<h3 className="text-xl font-semibold">Muito vazio por aqui</h3>
					<p>Vamos fazer upload do seu primeiro arquivo PDF.</p>
				</div>
			)}
		</main>
	)
}
