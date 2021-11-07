import { AppBar, Avatar, Button, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Toolbar, Typography, Container } from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/image'
import { Box, width } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { useAppContext } from '../../context/AppContext'
import { dispatchTypes, roleType } from '../../context/AppReducer'

export default function NavBar() {
    const { state, dispatch } = useAppContext();
    const { currentUser, currentUserRole } = state;

    const pages = [
        {
            name: 'Markaz',
            path: currentUserRole === roleType.ROLE_SUPERUSER ? '/admin/markaz' : '/markaz',
        },
        {
            name: 'Santri',
            path: currentUserRole === roleType.ROLE_SUPERUSER ? '/admin/santri' : '/santri',
        },
        {
            name: 'Relawan',
            path: '/relawan',
        },
        {
            name: 'Pengajar',
            path: '/pengajar',
        },
        {
            name: 'Profil',
            path: '/profile',
        }
    ]


    const handleLogout = () => {
        dispatch({
            type: dispatchTypes.LOGOUT
        })
    }

    const [open, setOpen] = useState({
        right: false
    })
    const toggleDrawer = (isOpen) => (event) => {
        setOpen({ ...open, right: isOpen });
    };

    const list = () => (
        <Box
            sx={{
                width: {
                    xs: '100vw', // theme.breakpoints.up('xs')
                    sm: 250, // theme.breakpoints.up('sm')
                },
                height: '100%',
                display: { xs: 'flex', sm: 'none' },
                mb: '2em'
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            flexDirection='column'
            justifyContent='space-between'
        >
            {currentUser && (
                <Box width='100vw' overflow='hidden' padding='2em'>
                    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                        <Avatar sx={{ width: 100, height: 100, mb: '1em' }}>{currentUser[0].toUpperCase()}</Avatar>
                    </Box>
                    <Typography sx={{ wordWrap: 'break-word' }} textAlign='center' variant='h5'>{currentUser.split('@')[0]}</Typography>
                    <Typography sx={{ wordWrap: 'break-word' }} textAlign='center'>{currentUserRole.split('_')[1]}</Typography>
                    <Button fullWidth color='error' sx={{ mt: '2em' }} size='large' variant='text' onClick={handleLogout}>Keluar</Button>
                </ Box>
            )}
            <Box display='flex' flexDirection='column' width='100%' flexGrow={1} justifyContent='flex-end'>
                <List>
                    {pages.map((page, index) => (
                        <ListItem button key={index}>
                            <Link href={page.path} passHref >
                                <ListItemText sx={{ textAlign: 'center' }} primary={page.name} />
                            </ Link>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {!currentUser && (
                <Container maxWidth="lg" >

                    <Link href='/login' passHref>
                        <Button fullWidth sx={{ mb: '1em' }} variant="contained" color="primary" size='large'>
                            Masuk
                        </Button>
                    </Link>
                    <Link href='/registration' passHref>
                        <Button fullWidth variant="outlined" color="primary" size='large'>
                            Daftar
                        </Button>
                    </Link>
                </Container>

            )}
        </Box>
    );
    return (
        <>
            {/* App Bar */}
            <Box sx={{ flexGrow: 1, position: 'fixed', width: '100%', zIndex: 1000 }}>
                <AppBar position='relative' sx={{ backgroundColor: 'rgba(255,255,255,.5)', backdropFilter: 'blur(5px)', }}>
                    <Container maxWidth="lg">
                        <Toolbar disableGutters>
                            <Link href='/' passHref>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Image src="/logo.png" alt="logo" width={60} height={40} />
                                </Box>
                            </ Link>
                            {pages.map((page, index) => (
                                <Link key={index} href={page.path} passHref >
                                    <Button color="primary" sx={{ display: { xs: 'none', sm: 'block' } }}>{page.name}</Button>
                                </ Link>
                            ))}
                            <IconButton
                                id='menuIconButton'
                                size="large"
                                color="primary"
                                edge="end"  //to counteract margin/padding
                                aria-label="menu"
                                sx={{ display: { xs: 'block', sm: 'none' } }}
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            {/* Drawer */}
            <Box>
                <SwipeableDrawer
                    anchor='right'
                    open={open.right}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                    disableSwipeToOpen={false}
                >
                    {list()}
                </SwipeableDrawer>
            </Box>
        </>
    )
}
