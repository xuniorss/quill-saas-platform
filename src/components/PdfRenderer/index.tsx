'use client'

import { ChevronDown, Loader2 } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useResizeDetector } from 'react-resize-detector'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const PdfRenderer = ({ url }: { url: string }) => {
	const { toast } = useToast()

	const { width, ref } = useResizeDetector()

	return (
		<article className="flex w-full flex-col items-center rounded-md bg-white shadow">
			<section className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
				<div className="flex items-center gap-1.5">
					<Button variant="ghost" aria-label="previous page">
						<ChevronDown className="h-4 w-4" />
					</Button>
					<div className="flex items-center gap-1.5">
						<Input className="h-8 w-12" />
						<p className="space-x-1 text-sm text-zinc-700">
							<span>/</span>
							<span>5</span>
						</p>
					</div>
				</div>
			</section>
			<section className="max-h-screen w-full flex-1">
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
						file={url}
						className="max-h-full"
					>
						<Page width={width ? width : 1} pageNumber={1} />
					</Document>
				</div>
			</section>
		</article>
	)
}
