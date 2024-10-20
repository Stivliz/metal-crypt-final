import React, { useState, ChangeEvent } from "react";
import { Input } from "@nextui-org/react";
import Swal from "sweetalert2";
import { Button } from "@nextui-org/react";
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

export const CreateAlbum = () => {
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
  };

  const cookies = new Cookies();
  console.log("* Cookies ---> ", cookies.get("band_id"));

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-800 p-9 rounded-xl ">
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <label htmlFor="name">Album Name</label>
          <Input
            type="text"
            name="name"
            placeholder="Título del álbum"
            onChange={handleInputChange}
            className="max-w-xs"
            required
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <label htmlFor="artist">Artist</label>
          <Input
            type="text"
            id="artist"
            name="artist"
            placeholder="Artista"
            className=""
            onChange={handleInputChange}
          />
        </div>
        <Button type="button" onClick={() => setIsModalOpen(true)}>
          Create list songs
        </Button>

        {isModalOpen && (
          <CardAlbumSong
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleSongsConfirm} // Pasamos la función para manejar las canciones
          />
        )}

        <label htmlFor="imageAlbum" className="block text-white">
          Imagen
        </label>
        <Input
          type="file"
          id="imageAlbum"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
          className=""
        />

        <label htmlFor="genre">Genre</label>
        <Input
          type="text"
          id="genre"
          name="genre"
          placeholder="Género"
          className=""
          onChange={handleInputChange}
        />

        <label htmlFor="year">Year</label>
        <Input type="date" id="year" name="year" onChange={handleInputChange} />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear álbum
        </button>
      </div>
    </form>
  );
};
