import React from 'react'
import DonationForm from '../../../component/templates/form/DonationForm'
import { useRouter } from 'next/router'

export default function DonasiSantri() {
    const router = useRouter()
    const query = router.query.id
    return (
        <DonationForm markazOrSantri={"santri"} recipient={"Santri 1"} routerQuery={query}/>
    )
}
