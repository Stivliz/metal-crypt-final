import React, { useState, ChangeEvent, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import CardAlbumSong from "@/components/cardAlbumSong";
import AlbumService from "@/services/album.service";
import { motion } from "framer-motion";

interface Song {
  name: string;
}

interface FormAlbum {
  //interface FormAlbum
  _id?: string; // Hacer opcional para nuevos álbumes
  name: string;
  artist?: string;
  songs?: Song[];
  image?: string | undefined;
  releaseType: "ALBUM" | "EP" | "SINGLE" | undefined;
  genre?: string[];
  year?: string;
}

interface CreateAlbumProps {
  closeModal: () => void;
  onAlbumCreated: (newAlbum: FormAlbum) => void;
}

export const CreateAlbum = ({
  closeModal,
  onAlbumCreated,
}: CreateAlbumProps) => {
  const [album, setAlbum] = useState<FormAlbum>({
    name: "",
    artist: "",
    songs: [],
    image: undefined,
    releaseType: undefined,
    genre: [],
    year: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true); // Estado para controlar los campos deshabilitados

  const $Album = new AlbumService();

  const convertToBase64 = (file: File | null) => {
    return new Promise<string | undefined>((resolve, reject) => {
      if (!file) return resolve(undefined);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "image" && "files" in e.target && e.target.files?.[0]) {
      const base64Image = await convertToBase64(e.target.files[0]);
      setAlbum({ ...album, image: base64Image });
    } else if (name === "genre") {
      setAlbum({
        ...album,
        genre: value.split(",").map((item) => item.trim()),
      });
    } else if (name === "year") {
      setAlbum({ ...album, year: value });
    } else {
      setAlbum({ ...album, [name]: value });
    }
  };

  const handleSongsConfirm = (songs: string[]) => {
    const formattedSongs = songs.map((song) => ({ name: song }));
    setAlbum((prev) => ({
      ...prev,
      songs: formattedSongs,
      releaseType: getReleaseType(formattedSongs.length),
    }));
  };

  const getReleaseType = (
    numSongs: number,
  ): "ALBUM" | "EP" | "SINGLE" | undefined => {
    if (numSongs === 1) return "SINGLE";
    if (numSongs >= 2 && numSongs <= 6) return "EP";
    if (numSongs > 6) return "ALBUM";
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await $Album.PostAlbum(album);

      if (response?.status === true) {
        Swal.fire("Álbum creado exitosamente!");
        onAlbumCreated(album);
      } else {
        throw new Error("Error al crear el álbum");
      }
    } catch (error) {
      console.log("Error en la creación del álbum:", error);
      Swal.fire("Error al crear el álbum");
    }
    closeModal();
  };

  const validateAlbum = (album: FormAlbum): boolean => {
    console.log("Validating album:", {
      nameValid: album.name.trim() !== "",
      artistValid: album.artist && album.artist.trim() !== "",
      songsValid: Array.isArray(album.songs) && album.songs.length > 0,
      releaseTypeValid: album.releaseType !== undefined,
      genreValid: Array.isArray(album.genre) && album.genre.length > 0,
      yearValid: album.year && album.year.trim() !== "",
      imageValid: album.image !== undefined,
    });

    return (
      album.name.trim() !== "" && // Name is required
      Boolean(album.artist?.trim()) && // Artist is required
      Array.isArray(album.songs) &&
      album.songs.length > 0 && // Songs must be an array with at least one song
      album.releaseType !== undefined && // Release type must be set
      Array.isArray(album.genre) &&
      album.genre.length > 0 && // Genre must be an array with at least one genre
      Boolean(album.year?.trim()) && // Year is required
      album.image !== undefined // Image is required
    );
  };

  useEffect(() => {
    const isValid = validateAlbum(album);
    setIsDisabled(!isValid);
  }, [album]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 flex justify-center items-center z-[100] bg-black/60 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full md:max-w-md mx-auto relative overflow-y-auto max-h-[90vh]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Forjar Álbum</h2>
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
                onChange={handleInputChange}
                className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors placeholder-gray-700"
                placeholder="Album Title" required
              />
            </div>

            {/* Artist */}
            <div>
              <label htmlFor="artist" className="block text-xs font-semibold text-gray-400 mb-1 tracking-wider uppercase">Artist</label>
              <input
                type="text" id="artist" name="artist"
                onChange={handleInputChange}
                className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-white focus:border-white focus:outline-none transition-colors placeholder-gray-700"
                placeholder="Band Name"
              />
            </div>

            {/* Button for song list */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full uppercase tracking-widest text-xs py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-medium rounded-md transition-colors"
              >
                + Añadir Canciones ({album.songs?.length || 0})
              </button>
            </div>

            {isModalOpen && (
              <CardAlbumSong
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleSongsConfirm}
                songs={album.songs || []}
              />
            )}

            {/* Image */}
            <div>
              <label htmlFor="picture" className="block text-xs font-semibold text-gray-400 mb-2 tracking-wider uppercase">Cover Image</label>
              
              {album.image && (
                <div className="mb-4 flex justify-center">
                  <div className="w-32 h-32 aspect-square rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-white/10 bg-black relative">
                    <img src={album.image} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
              )}

              <input
                type="file" id="picture" name="image" accept="image/*"
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
                onChange={handleInputChange}
                className="w-full px-2 py-2 bg-transparent border-b border-gray-600 text-gray-300 focus:border-white focus:outline-none transition-colors"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 border border-gray-600 hover:border-white text-white font-bold py-3 rounded transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                disabled={isDisabled}
              >
                Registrar Álbum
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </form>
  );
};