import { Header } from '../components/header';
import Providers from '../providers/providers';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode; }) {

  return (
    <html lang="en">
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <Providers>
          <div>
            <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
              <Header />
            </div>
            <div className="max-w-8xl mx-auto">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
