import { cn } from '@/lib/utils'

import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR" className="light">
			<body
				className={cn(
					'grainy min-h-screen font-sans antialiased',
					inter.className,
				)}
			>
				{children}
			</body>
		</html>
	)
}
