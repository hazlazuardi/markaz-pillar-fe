import React from 'react'
import DonationForm from '../../../component/templates/form/DonationForm'
import { useRouter } from 'next/router'

export default function DonasiMarkaz() {
    const router = useRouter()
    const query = router.query.id
    return (
        <DonationForm markazOrSantri={"markaz"} recipient={"Markaz 1"} routerQuery={query}/>
    )
}
