import { Footer } from '../components/footer'
import { Header } from '../components/header'
import Providers from '../providers/providers'
import '../styles/globals.css'

export default function RootLayout({

  /*
   * Layouts must accept a children prop.
   * This will be populated with nested layouts or pages
   */
  children
}: {
    children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow dark:bg-gray-800 dark:text-gray-200">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
