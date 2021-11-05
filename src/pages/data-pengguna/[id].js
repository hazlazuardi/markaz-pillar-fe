import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function DetailPengguna() {
    return (
        <div className={styles.container}>
            <Link href='/datapengguna' passHref>
                <p className={[styles.sub, styles.item1].join(" ")}><b>DETAIL PENGGUNA</b></p>
            </Link>
            <div className={styles.detailgrid}>
                <h1 className={styles.item1}>Roni Wijaya</h1>
                <div className={styles.item2}>
                    <h3 className={styles.sub}>USERNAME</h3>
                    <p>roniwijaya</p>
                </div>
                <div className={styles.item3}>
                    <h3 className={styles.sub}>EMAIL</h3>
                    <p>roniwijaya@gmail.com</p>
                </div>
                <div className={styles.item4}>
                    <h3 className={styles.sub}>NOMOR TELEPON</h3>
                    <p>+6212345678</p>
                </div>
                <div className={styles.item5}>
                    <h3 className={styles.sub}>ALAMAT</h3>
                    <p>Kampus UI, Jalan Margonda Raya, Pondok Cina, Beji, Pondok Cina, Kecamatan Beji, Kota Depok, Jawa Barat 16424</p>
                </div>
            </div>
        </div>
    )
}