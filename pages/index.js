import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { createTheme } from '@mui/material/styles';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/registration")
  }, [])
  return (
      <div>
        <p>Redirecting..</p>
      </div>
  )
}

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#004f5d',
    },
    secondary: {
      main: '#c2842b',
    },
    
    text: {
      primary: '#0000',
      secondary: '#737B7D'
    }
  },
    
});