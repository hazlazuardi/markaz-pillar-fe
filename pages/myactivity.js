//import Head from 'next/head'
import * as React from 'react';
import styles from '../styles/Activity.module.css'
import Layout from "../component/layout"
import Grid from '@material-ui/core/Grid'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Activity() {
  return (
  <Layout>
    <div className={styles.container2}>
      <Grid container
        direction="column"
        spacing={2}
        // justifyContent="space-around"
        // alignItems="stretch"
        >
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
                <a href="">Lihat Markaz </a>
                <IconButton aria-label="delete">
                <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </Grid>   
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
                <a>Fatimah Azzahra</a>
              </div>
              <div className={styles.kartu_item_status}>
                <a>Status</a><br />
                <a>Donasi diterima</a>
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
                <a href="">Lihat Santri </a>
                <IconButton aria-label="delete">
                <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </Grid>  
          <Grid item>
            <div className={styles.kartu_container}>
              <div className={styles.kartu_item_image}>
                gambar
              </div>
              <div className={styles.kartu_item_type}>
                <a>Jenis kegiatan</a><br />
                <a>Volunteer</a>
              </div>
              <div className={styles.kartu_item_target}>
                <a>Kegiatan volunteer</a><br />
                <a>Bercocok Tanam</a>
              </div>
              <div className={styles.kartu_item_status}>
                <a>Status</a><br />
                <a>Menunggu konfirmasi</a>
              </div>
              <div className={styles.kartu_item_date}>
                <a>Tanggal kegiatan</a><br />
                <a>14/08/2021</a>
              </div>
              <div className={styles.kartu_item_donat}>
                <a>Jadwal donasi</a><br />
                <a>Senin dan Rabu, 13.00-14.00</a>
              </div>
              <div className={styles.kartu_item_markaz}>
                <a href="">Lihat Kegiatan</a>
                <IconButton aria-label="delete">
                <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </Grid>  
        </Grid> 
        <Grid item>
          <ul className={styles.pagebutton}>
            <button className={styles.buttons}><li>1</li></button>
            <button className={styles.buttons}><li>2</li></button>
            <button className={styles.buttons}><li>3</li></button>
            <button className={styles.buttons}><li>4</li></button>
            <button className={styles.buttons}><li>5</li></button>
          </ul>
        </Grid>
      </Grid>
    </div>
  </Layout>
  )
}