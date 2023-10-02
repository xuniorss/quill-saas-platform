'use client'

export const PdfRenderer = ({ url }: { url: string }) => {
	return (
		<article className="flex w-full flex-col items-center rounded-md bg-white shadow">
			<section className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
				<div className="flex items-center gap-1.5"></div>
			</section>
		</article>
	)
}
