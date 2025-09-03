import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/app/components/theme-provider'
import { AppContextProvider } from '@/app/context/AppContext'
import './globals.css'
import Navbar from './components/Navbar'
import SaveToken from '@/app/save-token'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
            <AppContextProvider>
              <SaveToken />
              {children}</AppContextProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
