//import Head from 'next/head'
import Link from 'next/link'
import { useState } from "react"
import styles from '../styles/Home.module.css'
import Layout from "../component/layout"
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

export default function Activity() {
  return (
  <Layout>
    <div className={styles.container2}>
      <Grid container
        direction="column"
        spacing={2}
        // justifyContent="space-around"
        alignItems="stretch">
        <Grid item>
          <h1 className={styles.kegiatan}>
            KEGIATAN SAYA
          </h1>
        </Grid>
        <Grid item>
          <ul className={styles.list}>
            <li className={styles.listitem}>
              <a href=''>Semua kegiatan</a>
            </li>
            <li className={styles.listitem}>
              <a href=''>Donasi</a>
            </li>
            <li className={styles.listitem}>
              <a href=''>Volunteer</a>
            </li>
            <li className={styles.listitem}>
              <a href=''>Pengajar</a>
            </li>
            <li className={styles.listitem}>
              <a href=''>Kelas</a>
            </li>
          </ul>
        </Grid>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <div className={styles.kartu_container}>
              <div className={styles.kartu_item_image}>
                gambar
              </div>
              <div className={styles.kartu_item_type}>
                <a>Jenis kegiatan</a><br />
                <a>Donasi</a>
              </div>
              <div className={styles.kartu_item_target}>
                <a>Target donasi</a><br />
                <a>Markaz Pillar</a>
              </div>
              <div className={styles.kartu_item_status}>
                <a>Status</a><br />
                <a>Menunggu Pembayaran</a>
              </div>
              <div className={styles.kartu_item_date}>
                <a>Tanggal kegiatan</a><br />
                <a>14/08/2021</a>
              </div>
              <div className={styles.kartu_item_donat}>
                <a>Jumlah donasi</a><br />
                <a>Rp50.000,00</a>
              </div>
              <div className={styles.kartu_item_markaz}>
                <a>Lihat Markaz </a>
                <button>Delete</button>
              </div>
            </div>
          </Grid>  
        </Grid> 
      </Grid>
    </div>
  </Layout>
  )
}