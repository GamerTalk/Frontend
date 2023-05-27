import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/layouts/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Japan Finance',
  description: 'Save you money in Japan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <Header />
      </body>
    </html>
  )
}
