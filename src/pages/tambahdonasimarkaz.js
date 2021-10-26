import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';

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
         <p>Foto Markaz Placeholder</p>
         <div className={classes.pad2}>
             <TextField
               required
               id="outlined-required"
               label="Nama Markaz"
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
               label="Background Markaz"
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
               label="Kategori Markaz"
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
               label="Alamat Markaz"
               sx=
               {{
                width: '100%',
               }}
             />
         </div>
        <Stack spacing={2} direction="row"
          sx= {{
             justifyContent: 'center'
          }}>
             <TextField
               required
               id="outlined-required"
               label="Contact Person"
               sx=
               {{
                width: '50%',
                float: 'left',
               }}
             />
             <TextField
               required
               id="outlined-required"
               label="Kontak (Email/WhatsApp)"
               sx=
               {{
                width: '50%',
                float: 'right',
               }}
             />
         </Stack>
         <p>+ Tambah Donasi</p>
         <div className={classes.pad2}>
            <Stack spacing={2} direction="row"
              sx= {{
                 justifyContent: 'center'
              }}>
                 <TextField
                   id="outlined"
                   label="Nama Donasi"
                   sx=
                   {{
                    width: '100%',
                   }}

                 />
                 <div sx={{marginTop:"50%"}}>
                    <DoDisturbOnIcon color="primary"/>
                 </div>
             </Stack>
         </div>
         <div className={classes.pad2}>
             <TextField
               required
               id="outlined-required"
               label="Kategori Donasi"
               sx=
               {{
                width: '100%'
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
                width: '100%'
               }}
             />
         </div>
         <div className={classes.pad2}>
             <TextField
               required
              id="outlined-number"
              label="Nominal Yang Dibutuhkan"
              type="number"
               sx=
               {{
                width: '100%'
               }}
             />
         </div>
         <div className={classes.pad2}>
             <TextField
             disabled
              id="filled-disabled"
              label="Jumlah Donasi Saat Ini"
              type="number"
               sx=
               {{
                width: '100%'
               }}
             />
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
