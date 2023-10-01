import { trpc } from '@/app/_trpc/client'
import { UploadStatus } from '@prisma/client'
import { format } from 'date-fns'
import { Loader2, MessageSquare, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { memo, useState } from 'react'
import { Button } from '../ui/button'

interface FileListProps {
	userId: string | null
	id: string
	name: string
	uploadStatus: UploadStatus
	url: string
	key: string
	createdAt: string
	updatedAt: string
}

export const FileList = memo(({ file }: { file: FileListProps }) => {
	const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
		string | null
	>(null)

	const utils = trpc.useContext()

	return (
		<li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
			<Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
				<div className="flex w-full items-center justify-between space-x-6 px-6 pt-6">
					<div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
					<div className="flex-1 truncate">
						<div className="flex items-center space-x-3">
							<h3 className="truncate text-lg font-medium text-zinc-900">
								{file.name}
							</h3>
						</div>
					</div>
				</div>
			</Link>
			<div className="mt-4 grid grid-cols-3 place-items-center gap-6 px-6 py-2 text-xs text-zinc-500">
				<div className="flex items-center gap-2">
					<Plus className="h-4 w-4" />
					{format(new Date(file.createdAt), 'dd/MM/yyyy')}
				</div>

				<div className="flex items-center gap-2">
					<MessageSquare className="h-4 w-4" />
					mocked
				</div>

				<Button
					// onClick={() => deleteFile({ id: file.id })}
					size="sm"
					className="w-full"
					variant="destructive"
					aria-label="button delete file"
				>
					{currentlyDeletingFile === file.id ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<Trash className="h-4 w-4" />
					)}
				</Button>
			</div>
		</li>
	)
})

FileList.displayName = 'FileList'
