'use client';
import { useState, useMemo, ChangeEvent } from 'react';
import Authservice from '../../../services/auth.service'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

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

          Swal.fire("Logged!");
          router.push("/profile");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Fetch error:", error);
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
      <div className="flex flex-col justify-center max-w-md mx-auto p-6 bg-b rounded-lg shadow-md h-[100vh]">
        <h1 className="text-2xl font-bold mb-6 text-center">Inicio de Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bandname" className="block text-white font-bold mb-2">Nombre de la Banda</label>
            <input
              type="text"
              name="bandname"
              // id="bandName"
              placeholder='mormoth'
              // value={bandName}
              onChange={handleInpustChange}
              className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md"
              required
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="password" className="block text-white font-bold mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              // id="password"
              // value={password}
              onChange={handleInpustChange}
              className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md"
              required
              autoComplete='current-password'
            />
          </div>
  
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Iniciar Sesión
              
            </button>
          </div>
        </form>
        
        <div className='flex justify-center pt-3 gap-2'>
          <p className='text-gray-600'>¿No tienes una cuenta?</p>
          <Link className='text-blue-700' href='/register'>Register</Link>
        </div>
      </div>
    );
  };

export default Login