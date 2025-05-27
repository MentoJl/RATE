import './global.scss'
import Providers from './providers'

export const metadata = {
  title: 'RATE',
  icons: {
    icon: './Logo/HeaderLogo-preview.png',
    shortcut: './Logo/HeaderLogo-preview.png', 
    apple: './Logo/HeaderLogo-preview.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, backgroundColor: "#f0f2f5" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
