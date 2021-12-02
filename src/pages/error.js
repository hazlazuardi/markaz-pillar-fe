import React from 'react'
import { useRouter } from 'next/router'
import ErrorView from '../component/templates/ErrorView'

export default function ErrorPage() {
    const router = useRouter()
    const { statusCode, title } = router.query
    return (
        <ErrorView statusCode={statusCode} title={title} />
    )
}
