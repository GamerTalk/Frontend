import './globals.css'
import { Inter, Offside } from 'next/font/google'
import Header from './components/layouts/Header'
import { AuthContextProvider } from './context/AuthContext'

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

      <AuthContextProvider>
        
      <Header />
      {children}
      </AuthContextProvider>
      
      </body>
    </html>
  )
}
