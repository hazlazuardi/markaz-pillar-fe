//import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../component/layout"
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

export default function Home() {
  return (
  <Layout>
    <div className={styles.container2}>
      <Grid container
        direction="column"
        justifyContent="space-around"
        alignItems="stretch">
        <Grid item>
          <h1 className={styles.kegiatan}>
            KEGIATAN SAYA
          </h1>
        </Grid>
        <Grid item>
          <ul className={styles.list}>
            <li className={styles.listitem}>Semua kegiatan</li>
            <li className={styles.listitem}>Donasi</li>
            <li className={styles.listitem}>Volunteer</li>
            <li className={styles.listitem}>Pengajar</li>
            <li className={styles.listitem}>Kelas</li>
          </ul>
        </Grid>
      </Grid>
    </div>
  </Layout>
  )
}