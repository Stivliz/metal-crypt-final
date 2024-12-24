import React, { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import CardAlbumSong from "@/components/cardAlbumSong";
import AlbumService from "@/services/album.service";

interface Song {
  name: string;
}

interface Album {
  _id?: string; // Hacer opcional para nuevos álbumes
  name: string;
  artist?: string;
  songs?: Song[];
  image?: string | undefined;
  releaseType: "ALBUM" | "EP" | "SINGLE" | undefined;
  genre?: string[];
  year?: string;
}

export const CreateAlbum = ({ closeModal }: any) => {
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
    if (numSongs >= 4 && numSongs <= 6) return "EP";
    if (numSongs > 6) return "ALBUM";
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await $Album.PostAlbum(album);

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
    console.log("Form validation result:", isValid);
    setIsDisabled(!isValid);
  }, [album]);

  console.log("Album FORM:", album);

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-zinc-800 p-4 rounded-xl max-w-md mx-auto">
          <div className="flex justify-end mx-auto">
            <button
              className="bg-gray-800 text-white py-1 px-3 font-semibold rounded-full shadow"
              onClick={() => closeModal()}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Artist */}
          <div className="mb-3">
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
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              placeholder="Enter artist name"
            />
          </div>

          {/* Botón para crear lista de canciones */}
          <div className="mb-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full px-4 py-2 bg-black text-white font-medium rounded-md"
            >
              Create list songs
            </button>
          </div>

          {isModalOpen && (
            <CardAlbumSong
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleSongsConfirm}
            />
          )}

          {/*Image Upload*/}
          <div className="mb-3">
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

          {/* Otros campos */}
          <div className="mb-3">
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
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              placeholder="Enter genre"
            />
          </div>

          <div className="mb-3">
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
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-950 text-white font-medium rounded-md"
            disabled={isDisabled}
          >
            Crear álbum
          </button>
        </div>
      </div>
    </form>
  );
};

/*import React, { useState, ChangeEvent, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import CardAlbumSong from "@/components/cardAlbumSong";
import AlbumService from "@/services/album.service";

interface Song {
  name: string;
}

interface FormAlbum {
  name: string;
  artist?: string;
  songs?: Song[];
  image?: string | undefined;
  releaseType: "ALBUM" | "EP" | "SINGLE" | undefined; // Cambiado el tipo
>>>>>>> 1fec942 (cambios realizados la creaciond del formulario)
  genre?: string[];
  year?: string;
}

interface CreateAlbumProps {
  closeModal: () => void;
  onAlbumCreated: (newAlbum: Album) => void;
}

export const CreateAlbum = ({ closeModal, onAlbumCreated }: CreateAlbumProps) => {
  const [album, setAlbum] = useState<Album>({
    name: "",
    artist: "",
    songs: [],
    image: undefined,
    releaseType: "ALBUM", // Valor inicial
    genre: [],
    year: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const $Album = new AlbumService();

  const convertToBase64 = (file: File | null): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(undefined);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "releaseType") {
      setAlbum({ ...album, releaseType: value as "ALBUM" | "EP" | "SINGLE" });
      setIsDisabled(false);
    } else if (name === "image" && "files" in e.target && e.target.files?.[0]) {
      const base64Image = await convertToBase64(e.target.files[0]);
      setAlbum({ ...album, image: base64Image });
    } else if (name === "genre") {
      setAlbum({
        ...album,
        genre: value.split(",").map((item) => item.trim()),
      });
    } else {
      setAlbum({ ...album, [name]: value });
    }
  };

  const handleSongsConfirm = (songs: string[]) => {
    const formattedSongs = songs.map((song) => ({ name: song }));
    setAlbum({ ...album, songs: formattedSongs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await $Album.PostAlbum(album);

      if (response?.status) {
        Swal.fire("Álbum creado exitosamente!", "", "success");

        // Llama a la función pasada desde el componente padre
        onAlbumCreated(album);
      } else {
        throw new Error(response?.data || "Error al crear el álbum");
      }
    } catch (error) {
      console.error("Error en la creación del álbum:", error);
      Swal.fire("Error al crear el álbum", "", "error");
    }
    closeModal();
  };

  const getLabelAndPlaceholder = () => {
    switch (album.releaseType) {
      case "ALBUM":
        return { label: "Album Name", placeholder: "Enter album name" };
      case "EP":
        return { label: "EP Name", placeholder: "Enter EP name" };
      case "SINGLE":
        return { label: "Single Name", placeholder: "Enter single name" };
      default:
        return { label: "Name", placeholder: "Enter name" };
    }
  };

  const { label, placeholder } = getLabelAndPlaceholder();

<<<<<<< HEAD
=======
  const validateAlbum = (album: FormAlbum) => {
    return (
      album.name.trim() !== "" &&
      album.releaseType !== undefined &&
      album.artist?.trim() !== "" &&
      album.songs &&
      album.songs.length > 0 &&
      album.image !== undefined &&
      album.genre &&
      album.genre.length > 0 &&
      album.year?.trim() !== ""
    );
  };

  useEffect(() => {
    setIsDisabled(!validateAlbum(album));
  }, [album]);

  console.log("Album FORM:", album);

>>>>>>> 1fec942 (cambios realizados la creaciond del formulario)
  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-zinc-800 p-4 rounded-xl max-w-md mx-auto">
          <div className="flex justify-end mx-auto">
            <button
              className="bg-gray-800 text-white py-1 px-3 font-semibold rounded-full shadow"
              onClick={() => closeModal()}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Release Type *
          <div className="mb-3">
            <label
              htmlFor="releaseType"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Release Type
            </label>
            <select
              id="releaseType"
              name="releaseType"
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              required
            >
              <option value="" disabled selected>
                Select release type
              </option>
              <option value="ALBUM">Album</option>
              <option value="EP">EP</option>
              <option value="SINGLE">Single</option>
            </select>
          </div>

          {/* Name *
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              {label}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              placeholder={placeholder}
              required
              //disabled={isDisabled}
            />
          </div>

          {/* Otros campos como artista, canciones, imagen, etc. *
          <div className="mb-3">
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
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              placeholder="Enter artist name"
              //disabled={isDisabled}
            />
          </div>

          {/* Botón para crear lista de canciones *
          <div className="mb-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full px-4 py-2 bg-black text-white font-medium rounded-md"
              //disabled={isDisabled}
            >
              Create list songs
            </button>
          </div>

          {isModalOpen && album.releaseType && (
            <CardAlbumSong
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleSongsConfirm}
              releaseType={album.releaseType as "ALBUM" | "EP" | "SINGLE"}
            />
          )}

          {/* Otros campos como imagen, género, y año, todos deshabilitados *

          Image Upload
          <div className="mb-3">
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

           Genre*
          <div className="mb-3">
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
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              placeholder="Enter genre"
              //disabled={isDisabled}
            />
          </div>

         Year *
          <div className="mb-3">
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

           Botón de enviar
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-950 text-white font-medium rounded-md"
            disabled={isDisabled}
          >
            Crear álbum
          </button>
        </div>
      </div>
    </form>
  );
};
}*/
