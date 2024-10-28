import React, { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import CardAlbumSong from "@/components/cardAlbumSong";
import AlbumService from "@/services/album.service";
//import { PostAlbum } from "./create";

interface Song {
  name: string;
}

interface FormAlbum {
  name: string;
  artist?: string;
  songs?: Song[]; // Aquí cambiamos para reflejar que `songs` es un array de objetos { name: string }
  image?: string | undefined;
  genre?: string[];
  year?: string;
}

export const CreateAlbum = ({ closeModal }: any) => {
  const [album, setAlbum] = useState<FormAlbum>({
    name: "",
    artist: "",
    songs: [], // Inicializamos como un array vacío de objetos Song
    image: undefined,
    genre: [],
    year: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const $Album = new AlbumService();

  console.log("album:", album);

  // Función para convertir archivo a base64
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
      const base64Image = await convertToBase64(files[0]); // Convertir imagen a base64
      setAlbum({
        ...album,
        image: base64Image,
      });
    } else if (name === "genre") {
      setAlbum({
        ...album,
        genre: value.split(",").map((item) => item.trim()),
      });
    } else if (name === "year") {
      setAlbum({
        ...album,
        year: value,
      });
    } else {
      setAlbum({
        ...album,
        [name]: value,
      });
    }
  };

  // Función para estructurar correctamente las canciones
  const handleSongsConfirm = (songs: string[]) => {
    const formattedSongs = songs.map((song) => ({ name: song })); // Formateamos cada canción como { name: song }
    setAlbum({ ...album, songs: formattedSongs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar el álbum al backend con la estructura correcta de canciones
      const response = await $Album.PostAlbum(album);

      console.log("* Data desde el backend --->", response?.status);

      if (response?.status === true) {
        Swal.fire("Álbum creado exitosamente!");
      } else {
        throw new Error("Error al crear el álbum");
      }
    } catch (error) {
      console.log("Error en la creación del álbum:", error);
      Swal.fire("Error al crear el álbum");
    }
    closeModal();
  };

  const cookies = new Cookies();
  console.log("* Cookies ---> ", cookies.get("band_id"));

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 flex justify-center items-center  top-0 left-0 right-0 bottom-0 z-50">
        <div className="bg-zinc-800 p-4 rounded-xl max-w-md mx-auto ">
          {/* Album Name */}
          <div className="flex justify-end mx-auto">
            <button
              className="bg-gray-800 text-white py-1 px-3 font-semibold rounded-full shadow transition duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              onClick={() => closeModal()}
              aria-label="Close modal"
            >
              <span className="text-lg font-bold">✕</span>{" "}
              {/* O puedes usar "X" */}
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Album name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter album name"
              required
            />
          </div>

          {/* Artist */}
          <div className="mb-4">
            <label
              htmlFor="artist"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Artist
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter artist name"
            />
          </div>

          {/* Create Songs Button */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full px-4 py-2.5 bg-black hover:bg-zinc-900 transition-colors duration-200 text-white font-medium rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
            >
              Create list songs
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <CardAlbumSong
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleSongsConfirm}
            />
          )}

          {/* Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="picture"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="picture"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white hover:file:bg-zinc-900"
              />
            </div>
          </div>

          {/* Genre */}
          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter genre"
            />
          </div>

          {/* Year */}
          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Year
            </label>
            <input
              type="date"
              id="year"
              name="year"
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2.5 bg-blue-950 hover:bg-blue-900 transition-colors duration-200 text-white font-medium rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
          >
            Crear álbum
          </button>
        </div>
      </div>
    </form>
  );
};
