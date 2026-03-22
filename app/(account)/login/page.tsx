'use client';
import { useState, useMemo, ChangeEvent } from 'react';
import Authservice from '../../../services/auth.service'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

import Swal from 'sweetalert2'

const Login = () => {
    const [band, setBand] = useState({ bandname: '', password: '' })
    const $Auth = useMemo(() => new Authservice(), [])
    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();

      try {
        const { status, data } = await $Auth.singin(band)

        if(data) {
          const cookie = new Cookies()

          cookie.set('band_id', data.band.band_id, {path: '/'})
          cookie.set('logoBand', data.band.logoBand, {path: '/'})
          cookie.set('bandname', data.band.bandname, {path: '/'})
          cookie.set('genre', data.band.genre, {path: '/'})
          cookie.set('formedDate', data.band.formedDate, {path: '/'})
          cookie.set('token', data.token, {path: '/'})
          cookie.set('description', data.band.description, {path: '/'})

          Swal.fire("Logged!");
          router.push("/");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "user and password do not match",
        });
      }
    };

    const handleInpustChange = (e: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;

      setBand({
        ...band,
        [name]: value
      })
    }
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-center w-full max-w-md mx-auto p-10 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-black/60 backdrop-blur-xl border border-white/10 z-10 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
          
          <h1 className="text-3xl font-bold mb-8 text-center text-white tracking-widest uppercase glow-text">Login</h1>
          
          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="mb-6">
              <label htmlFor="bandname" className="block text-gray-400 font-medium mb-2 text-sm tracking-wide">BANDA</label>
              <input
                type="text"
                name="bandname"
                placeholder='mormoth'
                onChange={handleInpustChange}
                className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors placeholder-gray-700"
                required
              />
            </div>
    
            <div className="mb-8">
              <label htmlFor="password" className="block text-gray-400 font-medium mb-2 text-sm tracking-wide">PASSWORD</label>
              <input
                type="password"
                name="password"
                onChange={handleInpustChange}
                className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors"
                required
                autoComplete='current-password'
              />
            </div>
    
            <div className="flex items-center mt-6">
              <button
                type="submit"
                className="w-full uppercase tracking-widest bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 border border-gray-600 hover:border-white text-white font-bold py-3 px-4 rounded transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Ingresar
              </button>
            </div>
          </form>
          
          <div className='flex justify-center pt-8 gap-2 relative z-10 text-sm'>
            <p className='text-gray-500'>¿No tienes banda inscrita?</p>
            <Link className='text-gray-300 hover:text-white transition-colors underline decoration-gray-600 hover:decoration-white' href='/register'>Unirse</Link>
          </div>
        </motion.div>
      </div>
    );
  };

export default Login