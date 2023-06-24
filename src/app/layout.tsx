"use client"

import './globals.css'
import { Inter, Offside, Asap, Open_Sans} from 'next/font/google'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Landing from './landing/page'
import { useRouter } from "next/router";
import { AuthContextProvider } from './context/AuthContext'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from 'next/navigation';
import MessageContextProvider from './context/MessageContext'
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin']})
const offside = Offside({ subsets: ['latin'], weight:['400']})
const asap = Asap({subsets:['latin'], weight:['400']})
const open_sans = Open_Sans({subsets:['latin'], weight:['400']})

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
  const messagePath = /^\/messages\/\w+$/;

  const isMessagesPage = messagePath.test(pathname);

  return (
    <html lang="en">
      <head>
        <title>GamerTalk</title>
      </head>
      <body className={offside.className}>
         <MessageContextProvider>
          <AuthContextProvider>
          {pathname === "/landing" || pathname === '/' ? "" : <Header />}
          {children}
          {(pathname === "/landing" || pathname === '/' ||
          pathname === "/auth/signin" ||
          pathname === "/auth/signup" || isMessagesPage) ? (
            ""
            ) : (
              <Footer />
            )}
        </AuthContextProvider>
      </MessageContextProvider>
      </body>
    </html>
  );
}

