import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { createTheme } from '@mui/material/styles';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/registration")
  }, [router])
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
      primary: '#000000',
      secondary: '#737B7D'
    }
  },
  typography: {
    fontFamily: "'Poppins','Helvetica'",
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 800,
  }
});