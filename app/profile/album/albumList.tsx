"use client";

import { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
import AlbumService from "@/services/album.service";
import { CreateAlbum } from "./createAlbum";
import SongsAlbum from "./songsAlbum";

interface Album {
  _id?: string; // Hacer opcional para nuevos álbumes
  name: string;
  artist?: string;
  songs?: { id?: string; name: string }[];
  image?: string;
  releaseType: "ALBUM" | "EP" | "SINGLE";
  genre?: string[];
  year?: string;
}


export function AlbumList() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSongOpen, setIsModalSongOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const $Album = new AlbumService();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const result = await $Album.getAlbum();
      if (result.status) {
        setAlbums(result.data.message || []);
      } else {
        setError("Failed to fetch albums");
      }
    } catch (err) {
      setError("An error occurred while fetching albums");
    } finally {
      setLoading(false);
    }
  };

  const addAlbum = (newAlbum: Album) => {
    setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
  };

  const toggleModal = {
    openModalForm: function () {
      return setIsModalOpen(!isModalOpen);
    },
    openModalSong: function (album: Album) {
      setSelectedAlbum(album);
      return setIsModalSongOpen(!isModalSongOpen);
    },
  };

  if (loading) {
    return <p className="text-gray-500">Loading albums...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="flex items-center flex-col sm:flex sm:justify-between sm:flex-row">
        {albums.length > 0 ? (
          albums.map((album: Album) => (
            <div
              key={album._id}
              className="max-w-max p-4 mb-2 bg-gray-900 rounded-lg shadow-md md:py-6 md:px-5"
            >
              {album.image && (
                <button
                  className=""
                  onClick={() => toggleModal.openModalSong(album)}
                >
                  <Image
                    isZoomed
                    src={album.image}
                    alt={album.name}
                    width={150}
                    height={150}
                    className="rounded-lg w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110"
                  />
                </button>
              )}
              <h3 className="text-lg font-bold mt-2 text-white">
                {album.name}
              </h3>
              <p className="text-sm text-zinc-400">
                {album.year} • {album.releaseType.toUpperCase()}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-4 p-4 bg-gray-900 rounded-lg shadow-md min-h-[200px] flex flex-col items-center justify-center">
            <p className="text-gray-500">No albums found.</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
              onClick={toggleModal.openModalForm}
            >
              Create Album
            </button>
          </div>
        )}
        {albums.length > 0 && (
          <div
            className="p-4 bg-gray-900 rounded-lg shadow-md flex justify-center items-center cursor-pointer "
            onClick={toggleModal.openModalForm}
          >
            <span className=" flex justify-center items-center text-5xl text-gray-600 w-36 h-56">
              +
            </span>
          </div>
        )}
        {isModalSongOpen && selectedAlbum && (
          <SongsAlbum
            album={selectedAlbum}
            closeModal={toggleModal.openModalSong}
          />
        )}
        {isModalOpen && (
          <CreateAlbum
            closeModal={toggleModal.openModalForm}
            onAlbumCreated={addAlbum}
          />
        )}
      </div>
    </div>
  );
}
