import './globals.css'
import { Inter, Offside } from 'next/font/google'
import Header from './components/layouts/Header'

const inter = Inter({ subsets: ['latin'] })
const offside = Offside({ subsets: ['latin'], weight:['400']})

export const metadata = {
  title: 'GamerTalk',
  description: 'Learn languages with games!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={offside.className}>

      <Header />
      
      {children}

      </body>
    </html>
  )
}
