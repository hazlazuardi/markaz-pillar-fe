import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../component/layout"
import Link from 'next/link'
import { useState } from "react";

export default function Home() {
  return (
  <Layout>
  <div className={styles.bg}>
    <div className={styles.container}>

      <main className={styles.main}>
        <div className={styles.margin}>
            <div className={styles.gridcontainer}>
                <h1 className={styles.item1}> placeholder </h1>
                <h2 className={[styles.sub, styles.item2].join(" ")}> TENTANG KAMI</h2>
                 <h1 className={styles.item3}>
                     Welcome to Markaz Pilar!
                 </h1>
                <p className={styles.item4}>
                    Markaz Pilar adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Neque, mauris purus nulla fermentum scelerisque pharetra feugiat.
                    Nisl mi maecenas ut et iaculis. Eget lacus, sapien adipiscing in id nam.
                    Phasellus purus amet consectetur id ultricies aliquam sed magna habitant.
            </p>
        </div>
        </div>
      </main>
      </div>

     <div className={styles.container}>
        <div className={styles.gridnav}>
        <div className={styles.item1gn}>
            <b>Donasi untuk Markaz Pilar</b>
            <br/><br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Neque, mauris purus nulla fermentum scelerisque pharetra feugiat.
            <br/><br/>
            <button className={styles.btn1}>
                <Link href='/markazpilar'>
                 <a className={styles.navlink}>Donasi Sekarang</a>
                </Link>
            </button>
        </div>
        <div className={styles.item2gn}>
            <b>Donasi untuk Markaz Lain</b>
            <br/><br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Neque, mauris purus nulla fermentum scelerisque pharetra feugiat.
            <br/><br/>
            <button className={styles.btn1}>
                <Link href='/markaz'>
                 <a className={styles.navlink}>Lihat Markaz</a>
                </Link>
            </button>
        </div>
        <div className={styles.item3gn}>
            <b>Donasi untuk Santri</b>
            <br/><br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Neque, mauris purus nulla fermentum scelerisque pharetra feugiat.
            <br/><br/>
            <button className={styles.btn1}>
                <Link href='/santri'>
                 <a className={styles.navlink}>Lihat Santri</a>
                </Link>
            </button>
        </div>
        </div>
     </div>
    </div>
    <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.margin}>
                <div className={styles.gridcontainer1}>
                    <h1 className={styles.item1}> placeholder </h1>
                    <h2 className={[styles.sub, styles.item2].join(" ")}>PROGRAM UNTUK MASYARAKAT</h2>
                     <h1 className={styles.item3}>
                         Ikuti berbagai kelas di Markaz Pilar!
                     </h1>
                    <p className={styles.item4}>
                        Daftarkan diri anda untuk mengikuti berbagai kelas yang akan dipandu oleh para ahli dibidangnya.
                    </p>
                    <div className={styles.item5}>
                        <h2 className={[styles.sub].join(" ")}> KELAS HADIST</h2>
                        <p>Pengajar: Muhammad Adam, S.Pd.I.
                           Lokasi: Masjid UI Depok
                           Jadwal: Senin, 13.00-14.00</p>
                        <p className={styles.sub}>
                            <Link href='/kelas'>
                             <a className={styles.navlink}><b>Lihat program lain</b></a>
                            </Link>
                        </p>
                    </div>
                    <div className={styles.item6}>
                        <h2 className={[styles.sub].join(" ")}> KELAS BAHASA ARAB</h2>
                        <p>Pengajar: Junaidi, S.Pd.I.
                           Lokasi: Masjid UI Depok
                           Jadwal: Kamis, 15.00-17.00</p>

                    </div>
            </div>
            </div>
          </main>
      </div>
    <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.margin}>
                <div className={styles.gridcontainer2}>
                    <h1 className={styles.item1}> placeholder </h1>
                     <h1 className={styles.item3}>
                         Daftarkan diri anda sebagai pengajar di berbagai kelas!
                     </h1>
                    <p className={styles.item4}>
                        Daftarkan diri anda untuk mengikuti berbagai kelas yang akan dipandu oleh para ahli dibidangnya.
                    </p>
                    <div className={styles.item5}>
                        <h2 className={[styles.sub].join(" ")}> KELAS HADIST</h2>
                        <p>Pengajar: Muhammad Adam, S.Pd.I.
                           Lokasi: Masjid UI Depok
                           Jadwal: Senin, 13.00-14.00</p>
                        <p className={styles.sub}>
                            <Link href='/pengajar'>
                             <a className={styles.navlink}><b>Lihat program lain</b></a>
                            </Link>
                        </p>
                    </div>
                    <div className={styles.item6}>
                        <h2 className={[styles.sub].join(" ")}> KELAS BAHASA ARAB</h2>
                        <p>Pengajar: Junaidi, S.Pd.I.
                           Lokasi: Masjid UI Depok
                           Jadwal: Kamis, 15.00-17.00</p>

                    </div>
            </div>
            </div>
          </main>
      </div>
    <div className={styles.bg}>
    <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.margin}>
                <div className={styles.gridcontainer1}>
                    <h1 className={styles.item1}> placeholder </h1>
                    <h2 className={[styles.sub, styles.item2].join(" ")}>PROGRAM UNTUK SANTRI TAHFIDZ</h2>
                     <h1 className={styles.item3}>
                         Daftarkan diri Anda sebagai volunteer!
                     </h1>
                    <p className={styles.item4}>
                        Bantu kami menjalankan berbagai program untuk santri tahfidz dengan mendaftarkan diri anda sebagai volunteer di Markaz Pilar.
                    </p>
                    <div className={styles.item5}>
                        <h2 className={[styles.sub].join(" ")}>PROGRAM BERCOCOK TANAM</h2>
                        <p>Lokasi: Hutan UI
                           Jadwal: Selasa, 14 September 2021
                           Jumlah Volunteer: 3
                           </p>
                        <p className={styles.sub}>
                            <Link href='/volunteer'>
                             <a className={styles.navlink}><b>Lihat program lain</b></a>
                            </Link>
                        </p>
                    </div>
                    <div className={styles.item6}>
                        <h2 className={[styles.sub].join(" ")}>PROGRAM MICROSOFT EXCEL</h2>
                        <p>Lokasi: Fasilkom UI
                           Jadwal: Rabu, 15 September 2021
                           Jumlah Volunteer: 5</p>

                    </div>
            </div>
            </div>
          </main>
      </div>
      </div>
      <div className={styles.container2}>
        <h2 className={[styles.sub, styles.item2].join(" ")}>HUBUNGI KAMI</h2>
        <div className={styles.social}>
            <div className={styles.item1}>
                Tes
            </div>
            <div className={styles.item2}>
                Tes
            </div>
        </div>
      </div>
    </Layout>
  )
}
