'use client'

import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useResizeDetector } from 'react-resize-detector'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { z } from 'zod'
import { Button } from '../ui/button'
import { DropdownMenu } from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const PdfRenderer = ({ url }: { url: string }) => {
	const [numPages, setNumPages] = useState<number>()
	const [currPage, setCurrPage] = useState(1)

	const { toast } = useToast()

	const { width, ref } = useResizeDetector()

	const CustomPageValidator = z.object({
		page: z
			.string()
			.refine((num) => Number(num) > 0 && Number(num) <= numPages!),
	})

	type TCustomPageValidator = z.infer<typeof CustomPageValidator>

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<TCustomPageValidator>({
		resolver: zodResolver(CustomPageValidator),
		defaultValues: { page: '1' },
	})

	const handlePageSubmit: SubmitHandler<TCustomPageValidator> = useCallback(
		({ page }) => {
			setCurrPage(Number(page))
			setValue('page', String(page))
		},
		[setValue],
	)

	return (
		<article className="flex w-full flex-col items-center rounded-md bg-white shadow">
			<section className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
				<div className="flex items-center gap-1.5">
					<Button
						disabled={currPage <= 1}
						onClick={() =>
							setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))
						}
						variant="ghost"
						aria-label="previous page"
					>
						<ChevronDown className="h-4 w-4" />
					</Button>
					<div className="flex items-center gap-1.5">
						<Input
							{...register('page')}
							className={cn(
								'h-8 w-12',
								errors.page && 'focus-visible:ring-red-500',
							)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSubmit(handlePageSubmit)()
								}
							}}
						/>
						<p className="space-x-1 text-sm text-zinc-700">
							<span>/</span>
							<span>{numPages ?? 'x'}</span>
						</p>
					</div>
					<Button
						disabled={numPages === undefined || currPage === numPages}
						onClick={() =>
							setCurrPage((prev) =>
								prev + 1 > numPages! ? numPages! : prev + 1,
							)
						}
						variant="ghost"
						aria-label="next page"
					>
						<ChevronUp className="h-4 w-4" />
					</Button>
				</div>
				<div className="space-x-2">
					<DropdownMenu></DropdownMenu>
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
						onLoadSuccess={({ numPages }) => setNumPages(numPages)}
						file={url}
						className="max-h-full"
					>
						<Page width={width ? width : 1} pageNumber={currPage} />
					</Document>
				</div>
			</section>
		</article>
	)
}
