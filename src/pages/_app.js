import '../styles/globals.css'
import { AppWrapper } from '../context/AppContext'
import Layout from '../component/layout'
import ProtectedRoutes from '../ProtectedRoutes'

function MyApp({ Component, pageProps, router }) {
  return (
    <AppWrapper>
      <ProtectedRoutes router={router}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProtectedRoutes>
    </AppWrapper>
  )
}

export default MyApp
