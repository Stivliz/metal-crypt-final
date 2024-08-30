import Link from 'next/link'

const NavRoot = () => {
    return(
        <nav className='flex flex-col items-center bg-black pb-5'>


            <section className='w-[40%] mt-[70px]'>
                <ul className='flex justify-around'>
                    <li>
                        <Link href="/">
                           <p className='font-thin border-b-2 border-white'>Home</p> 
                        </Link>
                    </li>
                    {/* <li>
                        <Link href="/bands">
                            <p className='font-thin border-b-2 border-white'>Bands</p>
                        </Link>
                    </li> */}
                    <li>
                        <Link href="/aboutus">
                            <p className='font-thin border-b-2 border-white'>About</p>
                        </Link>
                    </li>
                </ul>
            </section>
            <div className="w-3/5 h-px bg-white my-4 mx-auto"></div>
        </nav>

    )
}
export default NavRoot