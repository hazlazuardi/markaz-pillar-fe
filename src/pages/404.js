import React from 'react'
import ErrorView from '../component/templates/ErrorView'

export default function Error404() {
    return (
        <>
            <ErrorView statusCode={404} title={"Halaman yang anda cari tidak ada."} />
        </>
    )
}
