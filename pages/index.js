import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

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
