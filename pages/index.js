import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

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
