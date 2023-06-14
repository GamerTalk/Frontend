"use client"

import './globals.css'
import { Inter, Offside } from 'next/font/google'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Landing from './landing/page'
import { useRouter } from "next/router";
import { AuthContextProvider } from './context/AuthContext'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from 'next/navigation';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })
const offside = Offside({ subsets: ['latin'], weight:['400']})

// export const metadata = {
//   title: 'GamerTalk',
//   description: 'Learn languages with games!',
// }



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
 
}) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body className={offside.className}>

      
      
      <AuthContextProvider>
      
      {pathname === "/landing" ? "" :<Header />}
      
      
      {children}
      <Footer />
      </AuthContextProvider>
      
      </body>
    </html>
  )
}

