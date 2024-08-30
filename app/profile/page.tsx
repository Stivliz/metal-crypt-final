'use client'
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import Image from "next/image"

import NavRoot from "@/components/NavRoot"
import NavBar from "@/components/NavBar"

const profile = () => {

    const [cookie, setCookie] = useState({
        band_id: null,
        bandname: null,
        genre: null,
        logoBand: '',
        formedDate: null
    })

    useEffect(() => {
        const cookies = new Cookies()

        const band_id = cookies.get('band_id')
        const logoBand = cookies.get('logoBand')
        const bandname = cookies.get('bandname')
        const genre = cookies.get('genre')
        const formedDate = cookies.get('formedDate')

        setCookie({
            band_id,
            bandname,
            genre,
            logoBand,
            formedDate
        })

    }, [])
    return(
        <div >
            <NavBar />
            <NavRoot />

            <p>ID: {cookie.band_id}</p>
            <Image width={400} height={400} src={cookie.logoBand} alt="photo" />
            <p>bandname: {cookie.bandname}</p>
            <p>genre: {cookie.genre}</p>
            <p>formedDate: {cookie.formedDate}</p>
        </div>
    )
}

export default profile