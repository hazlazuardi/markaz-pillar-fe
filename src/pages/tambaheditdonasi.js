import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


const useStyles = makeStyles((theme) => ({
  pad1: {
    padding: "3%"
  },
  pad2: {
    paddingBottom: "2%"
  },
  btn: {
    backgroundColor: "#004F5D",
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  btn2: {
    backgroundColor: "#FFFFFF",
    color: "#004F5D",
    fontWeight: "bold",
    textTransform: "capitalize",
    borderColor: "#004F5D"
  }
}));

export default function TambahDonasiMarkaz() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
    <Typography>
    <div className={classes.pad1}>
        <p> <b>UBAH MARKAZ</b> </p>
         <div className={classes.pad2}>
             <TextField
               required
               id="outlined-required"
               label="Nama Donasi"
               sx=
               {{
                width: '100%',
               }}
             />
         </div>
         <div className={classes.pad2}>
             <TextField
               required
               id="outlined-required"
               label="Kategori Donasi"
               sx=
               {{
                width: '100%',
               }}
             />
         </div>
         <div className={classes.pad2}>
             <TextField
               required
               id="outlined-required"
               label="Kebutuhan Fasilitas"
               sx=
               {{
                width: '100%',
               }}
             />
         </div>
         <div className={classes.pad2}>
             <TextField
               required
               id="outlined-required"
               label="Nominal yang Dibutuhkan"
               sx=
               {{
                width: '100%',
               }}
             />
         </div>
         <div className={classes.pad2}>
             <TextField
               disabled
               id="outlined-required"
               label="Jumlah Donasi Saat Ini"
               sx=
               {{
                width: '100%',
               }}
             />
         </div>
         <div className={classes.pad2}>
            <p>Tampilkan di halaman detail markaz?</p>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Yes" />
                    <FormControlLabel value="male" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
         </div>
              <Stack spacing={2} direction="row"
               sx= {{
                  justifyContent: 'center'
               }}>
                   <Button variant="outlined" className={classes.btn2}>Batal</Button>
                   <Button variant="contained" className={classes.btn}>Kirim</Button>
               </Stack>
     </div>
     </Typography>
    </>
  )
}
