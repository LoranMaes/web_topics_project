'use client'
import { Poppins } from 'next/font/google';
import { AuthContextProvider } from '@/context/AuthContext'
import styles from "../app/page.module.scss"
import { usePathname } from 'next/navigation'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({ children }) {
  const pathname = usePathname()

  return (
    <html lang="en" style={{fontSize: '62.5%', scrollBehavior: 'smooth', height: '100%'}}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <title>Guardian Care</title>
      </head>

      <body className={`${pathname === '/' ? styles.body : ''} ${poppins.variable}`} style={{ margin: 0, fontFamily: 'Poppins', minHeight: '100vh', backgroundColor: '#F9FAFB', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <AuthContextProvider> 
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
