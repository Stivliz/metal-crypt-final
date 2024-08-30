'use client'
import {Grenze_Gotisch} from '@next/font/google'

const grenzeGot = Grenze_Gotisch({
    subsets: ['latin'],
    weight: ['500'],

})

const Logo = () => {
    return (
        <div className="flex flex-col items-center">
            <p className="text-6xl text-center">⛧</p>
            <h1 className={`${grenzeGot.className} text-3xl`}>METAL CRYPT</h1>
        </div>

    )
}

export default Logo

