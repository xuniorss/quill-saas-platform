import { cn } from '@/lib/utils'

import './globals.css'

import { Navbar } from '@/components/Navbar'
import { Providers } from '@/components/Providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR" className="light">
			<Providers>
				<body
					className={cn(
						'grainy min-h-screen font-sans antialiased',
						inter.className,
					)}
				>
					<Navbar />
					{children}
				</body>
			</Providers>
		</html>
	)
}
