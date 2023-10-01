'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

export const UploadButton = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) setIsOpen(v)
			}}
		>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<Button>Upload PDF</Button>
			</DialogTrigger>
			<DialogContent>exem</DialogContent>
		</Dialog>
	)
}
