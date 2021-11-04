import React from 'react'
import DonationForm from '../../../component/templates/form/DonationForm'
import { useRouter } from 'next/router'
import { useState } from "react";

export default function DonasiSantri() {
    const [image, setImage] = useState();
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);

    const handleError = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    const router = useRouter()
    const query = router.query.id
    return (
        <DonationForm 
        markazOrSantri={"santri"} 
        recipient={"Santri 1"} 
        routerQuery={query}
        setImage = {setImage}
        setAmount = {setAmount}
        amount = {amount}
        handleClose = {handleClose}
        open = {open}
        setOpen = {setOpen}
        handleError = {handleError}
        />
    )
}
