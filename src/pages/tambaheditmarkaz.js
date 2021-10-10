import Table from 'react-bootstrap/Table'
import Layout from '../component/layout'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import TambahEdit from '../component/tambahedit'
import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useRouter } from 'next/router'
import { roleType } from '../context/AppReducer'

export default function TambahEditMarkaz() {
    return (
    <>
        <TambahEdit>
        </TambahEdit>
    </>
    )
}