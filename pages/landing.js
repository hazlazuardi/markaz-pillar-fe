import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../component/layout"

export default function Home() {
  return (
  <Layout>
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Markaz Pilar!
        </h1>
        <p>
            Markaz Pilar adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Neque, mauris purus nulla fermentum scelerisque pharetra feugiat.
            Nisl mi maecenas ut et iaculis. Eget lacus, sapien adipiscing in id nam.
            Phasellus purus amet consectetur id ultricies aliquam sed magna habitant.
        </p>
      </main>

    </div>
    </Layout>
  )
}
