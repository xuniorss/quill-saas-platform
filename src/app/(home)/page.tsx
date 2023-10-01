import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Step } from './_components/Step'
import { EffectBlur } from './_components/effect-blur'
import { Preview } from './_components/preview'

export default function Home() {
	return (
		<>
			<MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
				<div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
					<p className="text-sm font-semibold text-gray-700">
						Quill agora é público!
					</p>
				</div>
				<h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
					Converse com seus{' '}
					<span className="text-blue-600">documentos</span> em segundos.
				</h1>
				<p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
					Quill permite que você converse com qualquer documento PDF. Basta
					enviar seu arquivo e começar a fazer perguntas imediatamente.
				</p>
				<Link
					className={buttonVariants({ size: 'lg', className: 'mt-5' })}
					href="/dashboard"
					target="_blank"
				>
					Iniciar <ArrowRight className="ml-2 h-5 w-5" />
				</Link>
			</MaxWidthWrapper>
			{/* value proposition section */}
			<section>
				<div className="relative isolate">
					<EffectBlur />
					<div>
						<Preview src="/dashboard-preview.jpg" alt="product preview" />
					</div>
					<EffectBlur size="sm" />
				</div>
			</section>

			{/* Feature section */}
			<section className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
				<div className="mb-12 px-6 lg:px-8">
					<div className="mx-auto max-w-2xl sm:text-center">
						<h2 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
							Comece a conversar em minutos
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							Conversar com seus arquivos PDF nunca foi tão fácil como
							com Quill.
						</p>
					</div>
				</div>

				{/* steps */}
				<ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
					<Step.Root>
						<Step.Title title="Passo 1" />
						<Step.Subtitle subtitle="Inscreva-se pra uma conta" />
						<Step.Description description="Comece com um plano gratuito ou escolha nosso">
							<Step.Link href="/pricing" label="Plano profissional" />
						</Step.Description>
					</Step.Root>

					<Step.Root>
						<Step.Title title="Passo 2" />
						<Step.Subtitle subtitle="Carregue seu arquivo PDF" />
						<Step.Description description="Processaremos seu arquivo e o deixaremos pronto para você conversar" />
					</Step.Root>

					<Step.Root>
						<Step.Title title="Passo 3" />
						<Step.Subtitle subtitle="Comece a fazer perguntas" />
						<Step.Description description="É simples assim. Experimente o Quill hoje - leva menos de um minuto" />
					</Step.Root>
				</ol>

				<Preview src="/file-upload-preview.jpg" alt="uploading preview" />
			</section>
		</>
	)
}
