import { Button, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Image from 'next/image'
import ErrorView from "../component/templates/ErrorView"

const IMAGE_SIZE = 16
function Error({ statusCode }) {
    return (
        <p>
            {statusCode
                ? (
                    <ErrorView statusCode={statusCode} title={statusCode === 404 ? 'Halaman yang anda cari tidak ada.' : 'Maaf, terjadi kesalahan pada Server.'} />
                )
                : (
                    <ErrorView title='Maaf, terjadi kesalahan pada Client.' />
                )}
        </p>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error