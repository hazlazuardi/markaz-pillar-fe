import { useTheme } from '@mui/material/styles';
import layout from '../styles/Home.module.css';
import Layout from "../component/layout";
import Link from 'next/link';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "7%",
    textAlign: "left",
    width: "100%",
  },
  contentCenter: {
    padding: "7%",
    textAlign: "center",
  },
  bg: {
    backgroundColor: "#f1f4f5"
  },
  sub: {
    color: "#004F5D"
  },
  heading: {
    fontSize: "200%",
    padding: "7%",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#004F5D",
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  btn2: {
    color: "#004F5D",
    backgroundColor: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize",
    borderColor: "#004F5D",
    borderStyle: "solid",
    borderWidth: "thin",
    marginRight: "5px"
  },
  pad: {
    padding: "0%",
  },
  pad1: {
      padding: "5%",
    },
  email: {
    padding: "3%",
    textAlign: "center",
},
}));

export default function TambahEdit() {
  const classes = useStyles();
  const theme = useTheme();
    return (
        <>
        <div className={layout.container}>
            <form action="/" method="get">
                <label htmlFor="header-search">
                    <span className="visually-hidden"></span>
                </label>
                <p>Nama</p>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Nama"
                    name="s"
                    className={layout.search}
                />

                <p>Background</p>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Background"
                    name="s"
                    className={layout.search}
                />
                <p>Kategori</p>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Kategori"
                    name="s"
                    className={layout.search}
                />

                <p>Alamat</p>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Alamat"
                    name="s"
                    className={layout.search}
                />

                <p>Contact Person</p>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Contact Person"
                    name="s"
                    className={layout.search}
                />

                <p>Kebutuhan Fasilitas</p>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Kebutuhan Fasilitas"
                    name="s"
                    className={layout.search}
                />
                <p>Nominal Yang Dibutuhkan</p>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Nominal Yang Dibutuhkan"
                    name="s"
                    className={layout.search}
                />

                <p>Jumlah Donasi</p>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Jumlah Donasi"
                    name="s"
                    className={layout.search}
                />
                <br/><br/>
                <div className={layout.center}>
                    <Button href='/kelas' className={classes.btn2}>Batal</Button>
                    <Button type="submit" className={classes.btn}>Kirim</Button>

                </div>
            </form>
            </div>
        </>
    )
}