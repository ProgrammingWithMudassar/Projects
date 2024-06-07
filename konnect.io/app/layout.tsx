'use client'
import { AuthProvider } from '@/hooks/useAuth'
import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux';
// import store from '@/Redux/Store/Store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { store } from '@/Redux/Store/Store'
import StripeProvider from '@/hooks/StripeProvider';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <AuthProvider>
            <StripeProvider>
              {children}
            </StripeProvider>
          </AuthProvider>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  )
}
