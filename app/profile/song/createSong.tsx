import React, { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
import SongService from "@/services/song.service";
import { motion } from "framer-motion";

interface SongForm {
  name: string;
  artist: string;
  image: string | undefined;
  duration: number;
  genre: string[];
  year: string;
}

const CreateSong = ({ closeModal }: any) => {
  const [song, setSong] = useState<SongForm>({
    name: "",
    artist: "",
    image: undefined,
    duration: 0,
    genre: [],
    year: "",
  });

  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const $Song = new SongService();

  const convertToBase64 = (file: File | null) => {
    return new Promise<string | undefined>((resolve, reject) => {
      if (!file) return resolve(undefined);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const base64Image = await convertToBase64(files[0]);
      setSong({
        ...song,
        image: base64Image,
      });
    } else if (name === "genre") {
      const genres = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      setSong({
        ...song,
        genre: genres,
      });
    } else {
      setSong({
        ...song,
        [name]: value,
      });
    }
    closeModal();
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = Math.max(0, parseInt(value) || 0);

    if (name === "minutes") {
      setMinutes(parsedValue);
      // Actualiza la duración total en segundos
      const totalSeconds = parsedValue * 60 + seconds;
      setSong((prev) => ({ ...prev, duration: totalSeconds }));
    } else if (name === "seconds") {
      // Asegura que los segundos estén entre 0 y 59
      const validSeconds = Math.min(59, parsedValue);
      setSeconds(validSeconds);
      // Actualiza la duración total en segundos
      const totalSeconds = minutes * 60 + validSeconds;
      setSong((prev) => ({ ...prev, duration: totalSeconds }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (song.duration === 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Duration",
        text: "Please enter a valid duration for the song",
      });
      return;
    }

    try {
      const response = await $Song.PostSong(song);

      if (response?.status === true) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Song created successfully",
        });
        // Opcional: limpiar el formulario después de crear
        resetForm();
      } else {
        throw new Error("Failed to create song");
      }
    } catch (error) {
      console.error("Error creating song:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create the song",
      });
    }
  };

  const resetForm = () => {
    setSong({
      name: "",
      artist: "",
      image: undefined,
      duration: 0,
      genre: [],
      year: "",
    });
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 flex justify-center items-center z-[100] bg-black/60 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full md:max-w-md mx-auto relative overflow-y-auto max-h-[90vh] custom-scrollbar"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Forjar Canción</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => closeModal()}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6 relative z-10">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-gray-400 mb-1 tracking-wider uppercase">Name</label>
              <input
                type="text" id="name" name="name"
                value={song.name}
                onChange={handleInputChange}
                className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors placeholder-gray-700"
                placeholder="Song Title" required
              />
            </div>

            {/* Artist */}
            <div>
              <label htmlFor="artist" className="block text-xs font-semibold text-gray-400 mb-1 tracking-wider uppercase">Artist</label>
              <input
                type="text" id="artist" name="artist"
                value={song.artist}
                onChange={handleInputChange}
                className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors placeholder-gray-700"
                placeholder="Band Name" required
              />
            </div>

            {/* Image */}
            <div>
              <label htmlFor="image" className="block text-xs font-semibold text-gray-400 mb-2 tracking-wider uppercase">Cover Image</label>
              
              {song.image && (
                <div className="mb-4 flex justify-center">
                  <div className="w-32 h-32 aspect-square rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-white/10 bg-black relative">
                    <img src={song.image} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
              )}

              <input
                type="file" id="image" name="image" accept="image/*"
                onChange={handleInputChange}
                className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer transition-colors"
              />
            </div>

            {/* Genre */}
            <div>
              <label htmlFor="genre" className="block text-xs font-semibold text-gray-400 mb-1 tracking-wider uppercase">Genre (comma separated)</label>
              <input
                type="text" id="genre" name="genre"
                onChange={handleInputChange}
                className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors placeholder-gray-700"
                placeholder="Death Metal, Doom Metal..."
              />
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year" className="block text-xs font-semibold text-gray-400 mb-1 tracking-wider uppercase">Release Year</label>
              <input
                type="date" id="year" name="year"
                value={song.year}
                onChange={handleInputChange}
                className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-gray-300 focus:border-white focus:outline-none transition-colors"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 tracking-wider uppercase">Duration</label>
              <div className="flex space-x-4">
                <input
                  type="number" name="minutes"
                  value={minutes}
                  onChange={handleDurationChange}
                  min="0"
                  className="w-1/2 px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors placeholder-gray-700"
                  placeholder="Minutes"
                />
                <input
                  type="number" name="seconds"
                  value={seconds}
                  onChange={handleDurationChange}
                  min="0" max="59"
                  className="w-1/2 px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors placeholder-gray-700"
                  placeholder="Seconds"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full uppercase tracking-widest bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 border border-gray-600 hover:border-white text-white font-bold py-3 rounded transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Registrar Canción
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </form>
  );
};

export default CreateSong;
