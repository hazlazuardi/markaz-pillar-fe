import '../styles/globals.css'
import { AppWrapper } from '../context/AppContext'
import Layout from '../component/layout'
import ProtectedRoutes from '../ProtectedRoutes'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'
import { OnlineStatusProvider } from '../hook/useOnlineStatus'
import dynamic from 'next/dynamic'

const PWAPrompt = dynamic(
  () => import('react-ios-pwa-prompt'),
  { ssr: false }
)
//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

function MyApp({ Component, pageProps, router }) {
  return (
    <OnlineStatusProvider >
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <ProtectedRoutes router={router}>
            <Layout>
              <PWAPrompt promptOnVisit={1} timesToShow={3} copyClosePrompt="Close" permanentlyHideOnDismiss={false} />
              <Component {...pageProps} />
            </Layout>
          </ProtectedRoutes>
        </AppWrapper>
      </ThemeProvider>
    </OnlineStatusProvider>
  )
}

export default MyApp
