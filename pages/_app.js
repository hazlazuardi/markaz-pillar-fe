import '../styles/globals.css'
import { AppStore } from '../context/state'

function MyApp({ Component, pageProps }) {
  return (
    <AppStore>
      <Component {...pageProps} />
    </AppStore>
  )
}

export default MyApp
