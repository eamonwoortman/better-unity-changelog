import { Footer } from './footer'
import { Header } from './header'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-grow dark:bg-gray-800 dark:text-gray-200">{children}</main>
      <Footer />
    </div>
  )
}