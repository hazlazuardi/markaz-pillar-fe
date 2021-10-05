import '../styles/globals.css'
import { AppWrapper } from '../context/AppContext'
import Layout from '../component/layout'

function MyApp({ Component, pageProps }) {
  return (
      <AppWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppWrapper>
  )
}

export default MyApp
