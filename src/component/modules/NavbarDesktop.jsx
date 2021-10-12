import React, { useState } from 'react'
import Link from 'next/link'
import styles from "../../styles/Layout.module.css";
import layout from '../../styles/Home.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import { useAppContext } from '../../context/AppContext'
import { roleType, enumRoutes } from '../../context/AppReducer';
import { Box } from '@mui/system';


function NavbarDesktop() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const { state } = useAppContext();
    const { currentUserRole } = state;

    return (
        <Box sx={{ position: 'fixed', width: '100%', zIndex: 10000, backgroundColor: 'rgba(255,255,255,.7)', backdropFilter: 'blur(5px)' }}>
            <header className={layout.header}>
                <nav className={styles.navbar}>
                    <Link href='/'>
                        <a className={styles.navlogo}>Markaz Pillar</a>
                    </Link>
                    <ul className={isOpen === false ?
                        styles.navmenu : styles.navmenu + ' ' + styles.active}>
                        <li className={styles.navitem}>
                            <Link href={currentUserRole === roleType.ROLE_MEMBER ? '/markaz' : '/admin/markaz'}>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Markaz</a>
                            </Link>
                        </li>
                        <li className={styles.navitem}>
                            <Link href={currentUserRole === roleType.ROLE_MEMBER ? '/santri' : '/admin/santri'}>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Santri</a>
                            </Link>
                        </li>
                        <li className={styles.navitem}>
                            <Link href='/volunteer'>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Volunteer</a>
                            </Link>
                        </li>
                        <li className={styles.navitem}>
                            <Link href='/pengajar'>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Pengajar</a>
                            </Link>
                        </li>
                        <li className={styles.navitem}>
                            <Link href='/kelas'>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Kelas</a>
                            </Link>
                        </li>
                        <li className={styles.navitem}>
                            <Link href={enumRoutes.PROFILE}>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Profile</a>
                            </Link>
                        </li>
                    </ul>
                    <MenuIcon className={isOpen === false ?
                        styles.hamburger : styles.hamburger + ' ' + styles.active}
                        onClick={toggleMenu}
                    >
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </MenuIcon>
                </nav>
            </header>
        </Box>
    )
}

export default NavbarDesktop
