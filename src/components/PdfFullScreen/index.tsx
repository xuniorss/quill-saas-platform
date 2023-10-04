'use client'

import { Expand, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import { useResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { useToast } from '../ui/use-toast'

export const PdfFullScreen = ({ fileUrl }: { fileUrl: string }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [numPages, setNumPages] = useState<number>()

	const { width, ref } = useResizeDetector()

	const { toast } = useToast()

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) setIsOpen(v)
			}}
		>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<Button variant="ghost" className="gap-1.5" aria-label="fullscreen">
					<Expand className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-7xl">
				<SimpleBar
					autoHide={false}
					className="mt-6 max-h-[calc(100vh-10rem)]"
				>
					<div ref={ref}>
						<Document
							loading={
								<span className="flex justify-center">
									<Loader2 className="my-24 h-6 w-6 animate-spin" />
								</span>
							}
							onLoadError={() => {
								toast({
									title: 'Erro ao carregar o PDF',
									description: 'Por favor, tente novamente mais tarde',
									variant: 'destructive',
								})
							}}
							onLoadSuccess={({ numPages }) => setNumPages(numPages)}
							file={fileUrl}
							className="max-h-full"
						>
							{new Array(numPages).fill(0).map((_, idx) => (
								<Page
									key={idx}
									width={width ? width : 1}
									pageNumber={idx + 1}
								/>
							))}
						</Document>
					</div>
				</SimpleBar>
			</DialogContent>
		</Dialog>
	)
}
