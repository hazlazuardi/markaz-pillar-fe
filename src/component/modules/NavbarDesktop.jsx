import React, { useState } from 'react'
import Link from 'next/link'
import styles from "../../styles/Layout.module.css";
import layout from '../../styles/Home.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import { useAppContext } from '../../context/AppContext'
import { roleType, enumRoutes } from '../../context/AppReducer';
import { Box } from '@mui/system';
import Image from 'next/image';
import Typography from '@mui/material/Typography';

function NavbarDesktop() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const { state } = useAppContext();
    const { currentUserRole } = state;

    return (
        <Box sx={{ position: 'fixed', width: '100%', zIndex: 10000, backgroundColor: 'rgba(255,255,255,.7)', backdropFilter: 'blur(5px)' }}>
            <header className={layout.header}>
                <nav className={styles.navbar} color="primary">
                    <Link href='/' passHref>
                    <div className={layout.pad1}>
                        <Image src="/logo.png" alt="logo" width={60} height={40}/>
                        </div>
                    </Link>
                    <ul className={isOpen === false ?
                        styles.navmenu : styles.navmenu + ' ' + styles.active}>
                        <Typography className={styles.navitem} sx={{ margin: { xs: '5vh', md: 'auto' }}}>
                            <Link href={currentUserRole === roleType.ROLE_MEMBER ? '/markaz' : '/admin/markaz'}>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Markaz</a>
                            </Link>
                        </Typography>
                        <Typography className={styles.navitem} sx={{ margin: { xs: '5vh', md: 'auto' }}}>
                            <Link href={currentUserRole === roleType.ROLE_MEMBER ? '/santri' : '/admin/santri'}>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Santri</a>
                            </Link>
                        </Typography>
                        <Typography className={styles.navitem} sx={{ margin: { xs: '5vh', md: 'auto' }}}>
                            <Link href='/volunteer'>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Volunteer</a>
                            </Link>
                        </Typography>
                        <Typography className={styles.navitem} sx={{ margin: { xs: '5vh', md: 'auto' }}}>
                            <Link href='/pengajar'>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Pengajar</a>
                            </Link>
                        </Typography>
                        <Typography className={styles.navitem} sx={{ margin: { xs: '5vh', md: 'auto' }}}>
                            <Link href='/kelas'>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Kelas</a>
                            </Link>
                        </Typography>
                        <Typography className={styles.navitem}
                        sx={{ margin: { xs: '5vh', md: 'auto' }}}>
                            <Link href={enumRoutes.PROFILE}>
                                <a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={toggleMenu}>Profile</a>
                            </Link>
                        </Typography>
                    </ul>
                    <MenuIcon className={isOpen === false ?
                        styles.hamburger : styles.hamburger + ' ' + styles.active}
                        onClick={toggleMenu} sx={{ display: { xs: 'block', md: 'none' }}}
                    >
                    </MenuIcon>
                </nav>
            </header>
        </Box>
    )
}

export default NavbarDesktop
