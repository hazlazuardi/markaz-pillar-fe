//import Head from 'next/head'
import * as React from 'react';
import styles from '../styles/Activity.module.css'
import Layout from "../component/layout"
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

export default function Activity() {
  return (
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
              <Link fontFamily="Poppins" href=''>Semua kegiatan</Link>
            </li>
            <li className={styles.listitem}>
              <Link fontFamily="Poppins" href=''>Donasi</Link>
            </li>
            <li className={styles.listitem}>
              <Link fontFamily="Poppins" href=''>Volunteer</Link>
            </li>
            <li className={styles.listitem}>
              <Link fontFamily="Poppins" href=''>Pengajar</Link>
            </li>
            <li className={styles.listitem}>
              <Link fontFamily="Poppins" href=''>Kelas</Link>
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
                <Typography>Jenis kegiatan</Typography><br />
                <Typography>Donasi</Typography>
              </div>
              <div className={styles.kartu_item_target}>
                <Typography>Target donasi</Typography><br />
                <Typography>Markaz Pillar</Typography>
              </div>
              <div className={styles.kartu_item_status}>
                <Typography>Status</Typography><br />
                <Typography>Menunggu Pembayaran</Typography>
              </div>
              <div className={styles.kartu_item_date}>
                <Typography>Tanggal kegiatan</Typography><br />
                <Typography>14/08/2021</Typography>
              </div>
              <div className={styles.kartu_item_donat}>
                <Typography>Jumlah donasi</Typography><br />
                <Typography>Rp50.000,00</Typography>
              </div>
              <div className={styles.kartu_item_markaz}>
                <Typography href="">Lihat Markaz </Typography>
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
  )
}