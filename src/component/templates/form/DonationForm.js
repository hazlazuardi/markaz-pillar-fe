import React, { useState } from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styles from "../../../styles/Home.module.css";
import ArrowBack from "../../modules/ArrowBack";
import Typography from "@mui/material/Typography";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dropzone from '../../modules/Dropzone';
import MuiAlert from '@mui/material/Alert';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const steps = [
    'Informasi Donasi',
    'Metode Pembayaran',
    'Konfirmasi Pembayaran',
    ];

export default function DonationForm(props) {

    const {recipient, 
        markazOrSantri, 
        setImage, 
        handleChangeDetails, 
        details,
        handleClose,
        handleError,
        handleSubmit
    } = props

    const [step, setStep] = useState(0)

    const theme = useTheme();
    const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));

    return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Container maxWidth="lg" className={styles.container}>
                <ArrowBack name={recipient} markazOrSantri={markazOrSantri} />
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Container>
        </Grid>
        <Grid item xs={12} sx={{ backgroundColor: "lightgray" }}>
            <Container maxWidth="lg" className={styles.container}>
                <Box sx={{textAlign:"center", display: step == 0 ? "block" : "none"}}>
                    <Typography variant="h3" sx={{m : 4, fontWeight:"bold"}}>
                        Berapa Jumlah Uang Yang Ingin Anda Donasikan Kepada {recipient} ?
                    </Typography>
                    <FormControl sx={{ m: 1}} variant="standard">
                        <Input
                            name="amount"
                            required
                            id="standard-adornment-amount"
                            value={details.amount}
                            onChange={(e) => { 
                                if(isNaN(details.amount)) {
                                    handleError()
                                } else {
                                    handleClose()
                                }
                                handleChangeDetails(e)
                            }}
                            startAdornment={<InputAdornment position="start">Rp.</InputAdornment>}
                            error={(isNaN(details.amount))}
                        />
                    </FormControl>
                    <Button variant="contained" onClick={() => {
                            if(!isNaN(details.amount) && details.amount != 0) {
                                setStep(1)
                                console.log(details)
                            }
                        }}>Selanjutnya</Button>
                </Box>
                <Box sx={{textAlign:"center", display: step == 1 ? "flex" : "none", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                    <Typography variant="h3" sx={{m : 4, fontWeight:"bold"}}>
                        Pilih Metode Pembayaran
                    </Typography>
                    <Box sx={{width : mediumScreen ? "50%" : "100%"}}>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>BNI</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Pembayaran dilakukan ke rekening a.n. MARKAZ PILAR
                        </Typography>
                        <Box sx={{backgroundColor : "lightgrey", display: "flex", justifyContent:"space-between", p:2, m:1}}>
                            <Typography sx={{fontWeight:"bold"}}>
                                123456889
                            </Typography>
                            <Typography onClick={() =>  navigator.clipboard.writeText('123456889')} sx= {{cursor: "pointer"}}>
                                Salin
                            </Typography>
                        </Box>
                        <Typography>
                            Lakukan pembayaran sebelum DD/MM/YYYY
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography>BCA</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Pembayaran dilakukan ke rekening a.n. MARKAZ PILAR
                        </Typography>
                        <Box sx={{backgroundColor : "lightgrey", display: "flex", justifyContent:"space-between", p:2, m:1}}>
                            <Typography sx={{fontWeight:"bold"}}>
                                123456889
                            </Typography>
                            <Typography onClick={() =>  navigator.clipboard.writeText('123456889')} sx= {{cursor: "pointer"}}>
                                Salin
                            </Typography>
                        </Box>
                        <Typography>
                            Lakukan pembayaran sebelum DD/MM/YYYY
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography>Mandiri</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Pembayaran dilakukan ke rekening a.n. MARKAZ PILAR
                        </Typography>
                        <Box sx={{backgroundColor : "lightgrey", display: "flex", justifyContent:"space-between", p:2, m:1}}>
                            <Typography sx={{fontWeight:"bold"}}>
                                123456889
                            </Typography>
                            <Typography onClick={() =>  navigator.clipboard.writeText('123456889')} sx= {{cursor: "pointer"}}>
                                Salin
                            </Typography>
                        </Box>
                        <Typography>
                            Lakukan pembayaran sebelum DD/MM/YYYY
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    </Box>
                    <Box>
                        <Button sx={{m : 1}} variant="outlined" onClick={() => {
                            setStep(0)
                            }}>Kembali</Button>
                        <Button sx={{m : 1}} variant="contained" onClick={() => {
                            setStep(2)
                            }}>Selanjutnya</Button>
                    </Box>
                </Box>
                <Box sx={{textAlign:"center", display: step == 2 ? "block" : "none"}}>
                    <Box sx={{display: "flex", alignItems:"center", justifyContent:"center", flexDirection:"column", m:1}}>
                        <Typography variant="h3" sx={{m : 4, fontWeight:"bold"}}>
                            Upload Bukti Pembayaran
                        </Typography>
                        <Box sx={{width: mediumScreen ? 600 : "inherit"}}>
                            <Dropzone
                            name="paymentproof"
                            setFile={setImage}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Button sx={{m : 1}} variant="outlined" onClick={() => {
                            setStep(1)
                            }}>Kembali</Button>
                        <Button sx={{m : 1}} variant="contained" onClick={
                            handleSubmit
                        }>selesai</Button>
                    </Box>
                </Box>
            </Container>
        </Grid>
    </Grid>
    )
}
