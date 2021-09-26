import Link from 'next/link'
import { useState } from "react";
import styles from "../styles/Layout.module.css";
import layout from '../styles/Home.module.css'
export default function Layout({children}){

    const [isOpen,setIsOpen] = useState(false);
    const openMenu= ()=> setIsOpen(!isOpen);
    return <>
            <header className={layout.header}>
                <nav className={styles.navbar}>
                    <Link href='/'>
                     <a className={styles.navlogo}>Logo</a>
                    </Link>
                <ul className={isOpen === false ?
                        styles.navmenu : styles.navmenu +' '+ styles.active}>
                    <li className={styles.navitem}>
                       <Link href='/markaz'>
                         <a className={isOpen === false ?
                                    styles.navlink : styles.navlink+' '+styles.active}
                                    onClick={openMenu}>Markaz</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/santri'>
                          <a className={isOpen === false ?
                                    styles.navlink : styles.navlink+' '+styles.active}
                                    onClick={openMenu}>Santri</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/volunteer'>
                         <a className={isOpen === false ?
                                    styles.navlink : styles.navlink+' '+styles.active}
                                    onClick={openMenu}>Volunteer</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/pengajar'>
                         <a className={isOpen === false ?
                                    styles.navlink : styles.navlink+' '+styles.active}
                                    onClick={openMenu}>Pengajar</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/kelas'>
                         <a className={isOpen === false ?
                                    styles.navlink : styles.navlink+' '+styles.active}
                                    onClick={openMenu}>Kelas</a>
                        </Link>
                    </li>
                </ul>
                <button className={isOpen === false ?
                                    styles.hamburger : styles.hamburger+' '+styles.active}
                                    onClick={openMenu}
                                    >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
                </nav>
            </header>
        {children}
        {/* {footer} */}
        <div className={layout.container}>
            <footer className={styles.footer}>
            PPL 2021
        </footer>
      </div>
     </>
}