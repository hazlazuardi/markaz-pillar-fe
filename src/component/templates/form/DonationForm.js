import React, { useState } from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styles from "../../../styles/Home.module.css";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { dispatchTypes, enumRoutes } from '../../../context/AppReducer';
import { useAppContext } from '../../../context/AppContext';
import { useRouter } from 'next/router';
import CopyToClipboard from 'react-copy-to-clipboard';

const steps = [
    'Informasi Donasi',
    'Metode Pembayaran',
    'Konfirmasi Pembayaran',
];

export default function DonationForm(props) {

    const {
        recipient,
        setImage,
        image,
        details,
        setDetails,
        apiCall,
        redirectURL
    } = props

    const [step, setStep] = useState(0)
    const [open, setOpen] = useState(false);

    const router = useRouter()
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const extraSmallScreen = useMediaQuery(theme.breakpoints.up("xs"));
    const { dispatch } = useAppContext();


    const [isCopied, setIsCopied] = useState(false);
    const [copiedText, setCopiedText] = useState("")
    const onCopyText = (text) => {
        setIsCopied(true);
        setCopiedText(text);
        dispatch({
            type: dispatchTypes.SNACKBAR_CUSTOM,
            payload: {
                severity: "success",
                message: `Rek. ${text} tersalin ke Clipboard!`
            }
        })
        setTimeout(() => {
            setIsCopied(false);
        }, 4000);
    };
    // ******************************************
    // From pages
    // ******************************************
    const handleError = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleChangeDetails = ({ target }) => {
        const { name, value } = target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const formData = new FormData();
        const detailBlob = new Blob([JSON.stringify(details)], {
            type: "application/json",
        });
        formData.append("payment", image);
        formData.append("detail", detailBlob);

        await apiCall(formData)
            .then(response => {
                setLoading(false)
                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Data Uploaded"
                    }
                })
                router.replace(redirectURL)
            })
            .catch(error => {
                setLoading(false)
                // Check & Handle if error.response is defined
                if (!!error.response && error.response.status === 400) {
                    // Check & Handle if bad request (empty fields, etc)
                    dispatch({
                        type: dispatchTypes.SNACKBAR_CUSTOM,
                        payload: {
                            severity: 'error',
                            message: 'Upload Failed'
                        }
                    });
                }
            })
    };




    return (
        <Grid container>
            <Grid item xs={12}>
                <Container maxWidth="lg" className={styles.container}>
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
                    <Box sx={{ textAlign: "center", display: step == 0 ? "block" : "none" }}>
                        <Typography variant={extraSmallScreen ? "h5" : "h3"} sx={{ mb: extraSmallScreen ? 4 : 0, textAlign: 'left' }}>
                            Berapa Jumlah Uang Yang Ingin Anda Donasikan Kepada {recipient.length > 18 ? recipient.substring(0, 18) + "..." : recipient} ?
                        </Typography>
                        <FormControl sx={{ mb: 4 }} variant="standard">
                            <Input
                                name="amount"
                                required
                                id="standard-adornment-amount"
                                value={details.amount}
                                onChange={(e) => {
                                    if (isNaN(details.amount)) {
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
                            if (!isNaN(details.amount) && details.amount != 0) {
                                setStep(1)
                            }
                        }}>Selanjutnya</Button>
                    </Box>
                    <Box sx={{ textAlign: "center", display: step == 1 ? "flex" : "none", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Typography variant={extraSmallScreen ? "h5" : "h3"} sx={{ m: extraSmallScreen ? 4 : 2 }}>
                            Pilih Metode Pembayaran
                        </Typography>
                        <Box sx={{ width: smallScreen ? "50%" : "100%" }} mb={{ xs: 4, sm: 2 }}>
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
                                    <Box sx={{ backgroundColor: "lightgrey", display: "flex", justifyContent: "space-between", p: 2, m: 1 }}>
                                        <Typography sx={{ fontWeight: "bold" }}  >
                                            567890
                                        </Typography>
                                        <CopyToClipboard text={"567890"} onCopy={() => onCopyText("567890")}>
                                            <Button color={isCopied && copiedText === '567890' ? 'success' : 'primary'} variant={isCopied && copiedText === '567890' ? 'contained' : 'text'} >
                                                {isCopied && copiedText === "567890" ? "Tersalin" : "Salin"}
                                            </Button>
                                        </CopyToClipboard>
                                    </Box>
                                    <Typography>
                                        Lakukan pembayaran sebelum ...
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
                                    <Box sx={{ backgroundColor: "lightgrey", display: "flex", justifyContent: "space-between", p: 2, m: 1 }}>
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            12345
                                        </Typography>
                                        <CopyToClipboard text={"12345"} onCopy={() => onCopyText("12345")}>
                                            <Button color={isCopied && copiedText === '12345' ? 'success' : 'primary'} variant={isCopied && copiedText === '12345' ? 'contained' : 'text'}>
                                                {isCopied && copiedText === "12345" ? "Tersalin" : "Salin"}
                                            </Button>
                                        </CopyToClipboard>
                                    </Box>
                                    <Typography>
                                        Lakukan pembayaran sebelum ...
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
                                    <Box sx={{ backgroundColor: "lightgrey", display: "flex", justifyContent: "space-between", p: 2, m: 1 }}>
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            98765
                                        </Typography>
                                        <CopyToClipboard text={"98765"} onCopy={() => onCopyText("98765")}>
                                            <Button color={isCopied && copiedText === '98765' ? 'success' : 'primary'} variant={isCopied && copiedText === '98765' ? 'contained' : 'text'}>
                                                {isCopied && copiedText === "98765" ? "Tersalin" : "Salin"}
                                            </Button>
                                        </CopyToClipboard>
                                    </Box>
                                    <Typography>
                                        Lakukan pembayaran sebelum ...
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        <Box>
                            <Button sx={{ m: 1 }} variant="outlined" onClick={() => {
                                setStep(0)
                            }}>Kembali</Button>
                            <Button sx={{ m: 1 }} variant="contained" onClick={() => {
                                setStep(2)
                            }}>Selanjutnya</Button>
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: "center", display: step == 2 ? "block" : "none" }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", m: 1 }} >
                            <Typography variant={extraSmallScreen ? "h5" : "h3"} sx={{ m: smallScreen ? 4 : 2 }} mb={{ xs: 4, sm: 2 }}>
                                Upload Bukti Pembayaran
                            </Typography>
                            <Box sx={{ width: smallScreen ? 600 : "inherit" }} mb={{ xs: 4, sm: 2 }}>
                                <Dropzone
                                    name="paymentproof"
                                    setFile={setImage}
                                    accept={"image/*"}
                                    fileSize={1048576}
                                />
                                {image.name &&
                                    <Grid item xs={12}>
                                        <Typography id='dropzone-uploaded' variant="body1" color="initial">Uploaded: {image.name}</Typography>
                                    </Grid>
                                }
                            </Box>
                        </Box>
                        <Box>
                            <Button sx={{ m: 1 }} variant="outlined" onClick={() => {
                                setStep(1)
                            }}>Kembali</Button>
                            <Button disabled={loading} sx={{ m: 1 }} variant="contained" onClick={handleSubmit}>selesai</Button>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    )
}
