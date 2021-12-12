import { Footer } from './footer'
import { Header } from './header'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}