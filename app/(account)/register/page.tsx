'use client';
import { useState, useMemo, ChangeEvent } from 'react';
import Authservice from '../../../services/auth.service'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Swal from 'sweetalert2'

interface FormData {
  bandname: string,
  password: string,
  logoBand: File | null,
  genre: string[],
  formedDate: string
}

const Register = () => {
  const $Auth = useMemo(() => new Authservice(), []);
  const router = useRouter();
  const [data, SetData] = useState<FormData>({
    bandname: '',
    password: '',
    logoBand: null,
    genre: [],
    formedDate: ''
  });

  const handleInpustChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'logoBand' && files) {
      SetData({
        ...data,
        [name]: files[0]
      });
    } else if (name === 'genre') {
      SetData({
        ...data,
        [name]: value.split(',').map(item => item.trim())
      });
    } else {
      SetData({
        ...data,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('bandname', data.bandname);
    formData.append('password', data.password);
    formData.append('genre', data.genre.join(','));
    formData.append('formedDate', data.formedDate);
    if (data.logoBand) {
      formData.append('logoBand', data.logoBand);
    }

    try {
      const dataBand = await $Auth.signup(formData);      
      if (dataBand.status) {
        Swal.fire("Band registered successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-md mx-auto p-6 rounded-lg shadow-md h-[100vh]">
      <h1 className="text-2xl font-bold mb-6 text-center">Registro de Banda</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="bandname" className="block text-white font-bold mb-2">Nombre de la Banda</label>
          <input
            type="text"
            name='bandname'
            onChange={handleInpustChange}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-white font-bold mb-2">Contraseña</label>
          <input
            type="password"
            name='password'
            onChange={handleInpustChange}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="genre" className="block text-white font-bold mb-2">Género</label>
          <input
            type="text"
            name='genre'
            onChange={handleInpustChange}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="logoBand" className="block text-black font-bold mb-2">Imagen</label>
          <input
            type="file"
            id="logoBand"
            name='logoBand'
            accept="image/*"
            onChange={handleInpustChange}
            className="w-full text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="formedDate" className="block text-white font-bold mb-2">Fecha de Creación</label>
          <input
            type="date"
            name='formedDate'
            onChange={handleInpustChange}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          {
            !data.bandname || !data.password || !data.logoBand 
            || !data.genre || !data.formedDate ?
            (
              <button
                disabled={true}
                type="submit"
                className="bg-blue-700 border-gray-700 text-white-400 font-bold py-2 px-4 rounded"
              >
                Registrarse
          </button>
            )
            :
            (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Registrarse
            </button>
            )
          }

        </div>
      </form>

      <div className='flex justify-center pt-3 gap-2'>
          <p className='text-gray-600'>¿Ya tienes una cuenta?</p>
          <Link className='text-blue-700' href='/login'>Login</Link>
        </div>
    </div>
  );
};

export default Register;