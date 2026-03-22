'use client';
import { useState, useMemo, ChangeEvent } from 'react';
import Authservice from '../../../services/auth.service'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen flex items-center justify-center bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col justify-center w-full max-w-md mx-auto p-10 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-black/60 backdrop-blur-xl border border-white/10 z-10 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>

        <h1 className="text-3xl font-bold mb-8 text-center text-white tracking-widest uppercase">Únete al Crypt</h1>
        
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="mb-5">
            <label htmlFor="bandname" className="block text-gray-400 font-medium mb-1 text-xs tracking-wider uppercase">Banda</label>
            <input
              type="text"
              name='bandname'
              onChange={handleInpustChange}
              className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-400 font-medium mb-1 text-xs tracking-wider uppercase">Contraseña</label>
            <input
              type="password"
              name='password'
              onChange={handleInpustChange}
              className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="genre" className="block text-gray-400 font-medium mb-1 text-xs tracking-wider uppercase">Género (separados por coma)</label>
            <input
              type="text"
              name='genre'
              onChange={handleInpustChange}
              className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="logoBand" className="block text-gray-400 font-medium mb-2 text-xs tracking-wider uppercase">Logo de la Banda</label>
            <input
              type="file"
              id="logoBand"
              name='logoBand'
              accept="image/*"
              onChange={handleInpustChange}
              className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer transition-colors"
              required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="formedDate" className="block text-gray-400 font-medium mb-1 text-xs tracking-wider uppercase">Fecha de Formación</label>
            <input
              type="date"
              name='formedDate'
              onChange={handleInpustChange}
              className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-gray-300 focus:border-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="flex items-center mt-6">
            <button
              disabled={!data.bandname || !data.password || !data.logoBand || !data.genre || !data.formedDate}
              type="submit"
              className="w-full uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 border border-gray-600 hover:border-white text-white font-bold py-3 px-4 rounded transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Forjar Banda
            </button>
          </div>
        </form>

        <div className='flex justify-center pt-8 gap-2 relative z-10 text-sm'>
            <p className='text-gray-500'>¿Ya eres miembro?</p>
            <Link className='text-gray-300 hover:text-white transition-colors underline decoration-gray-600 hover:decoration-white' href='/login'>Ingresar</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;