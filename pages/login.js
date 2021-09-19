import React from 'react'
import { Grid, Typography, TextField, Button, Divider} from '@material-ui/core'

export default function login() {
    return (
        <div>
            <Grid container style={{ minHeight: "100vh"}}>
                <Grid item xs={12} sm={6}>
                    <img src="https://via.placeholder.com/150" style={{ width: "100%", height: "100%", objectFit:"cover"}} alt="brand" />
                </Grid>
                <Grid container item xs={12} sm={6} alignItems="center" direction="column" justifyContent="center" style={{padding:10}}>
                    <div>
                        <Grid container justify="center">
                            <Typography variant={'h4'}>Masuk ke akun anda</Typography>
                        </Grid>
                    </div>
                    <div>
                        <Button variant="contained">Masuk dengan Google</Button>
                    </div>
                    <Divider variant="middle" />
                    <div>
                        <TextField required label="Email" variant="outlined" margin="normal"></TextField>
                    </div>
                    <div>
                        <TextField required label="Password" variant="outlined" margin="normal"></TextField>
                    </div>
                    <div>
                        <Button variant="contained">Masuk</Button>
                    </div>
                    <div>
                        <Typography variant="p">Belum memiliki akun? Registrasi</Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
