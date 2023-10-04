'use client'

import { ChevronDown, ChevronUp, Loader2, RotateCw, Search } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useResizeDetector } from 'react-resize-detector'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import SimpleBar from 'simplebar-react'
import { z } from 'zod'
import { PdfFullScreen } from '../PdfFullScreen'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const PdfRenderer = ({ url }: { url: string }) => {
	const [numPages, setNumPages] = useState<number>()
	const [currPage, setCurrPage] = useState(1)
	const [scale, setScale] = useState(1)
	const [rotation, setRotation] = useState(0)
	const [renderedScale, setRenderedScale] = useState<number | null>(null)

	const isLoading = renderedScale !== scale

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
						onClick={() => {
							setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))
							setValue('page', String(currPage - 1))
						}}
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
						onClick={() => {
							setCurrPage((prev) =>
								prev + 1 > numPages! ? numPages! : prev + 1,
							)
							setValue('page', String(currPage + 1))
						}}
						variant="ghost"
						aria-label="next page"
					>
						<ChevronUp className="h-4 w-4" />
					</Button>
				</div>
				<div className="space-x-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="gap-1.5"
								aria-label="zoom"
								variant="ghost"
							>
								<Search className="h-4 w-4" />
								{scale * 100}%
								<ChevronDown className="h-3 w-3 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onSelect={() => setScale(1)}>
								100%
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setScale(1.5)}>
								150%
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setScale(2)}>
								200%
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setScale(2.5)}>
								250%
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button
						onClick={() => setRotation((prev) => prev + 90)}
						variant="ghost"
						aria-label="rotate 90 degrees"
					>
						<RotateCw className="h-4 w-4" />
					</Button>

					<PdfFullScreen fileUrl={url} />
				</div>
			</section>
			<section className="max-h-screen w-full flex-1">
				<SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
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
							{isLoading && renderedScale ? (
								<Page
									width={width ? width : 1}
									pageNumber={currPage}
									scale={scale}
									rotate={rotation}
									key={'@' + renderedScale}
								/>
							) : null}
							<Page
								className={cn(isLoading ? 'hidden' : '')}
								width={width ? width : 1}
								pageNumber={currPage}
								scale={scale}
								rotate={rotation}
								key={'@' + scale}
								loading={
									<div className="flex justify-center">
										<Loader2 className="my-24 h-6 w-6 animate-spin" />
									</div>
								}
								onRenderSuccess={() => setRenderedScale(scale)}
							/>
						</Document>
					</div>
				</SimpleBar>
			</section>
		</article>
	)
}
