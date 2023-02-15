import { Header } from '../components/header';
import Providers from '../providers/providers';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode; }) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col h-screen">
            <Header />
            <main className="flex flex-1 overflow-y-auto scroll-smooth ">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
