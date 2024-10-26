"use client";

import { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
import AlbumService from "@/services/album.service";
import { CreateAlbum } from "./createAlbum";

interface Album {
  _id: string;
  name: string;
  artist: string;
  songs: { id: string; name: string }[];
  image: string;
  genre?: string[];
  year?: string;
}

export function AlbumList() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const $Album = new AlbumService();

  useEffect(() => {
    async function fetchAlbums() {
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
    }
    fetchAlbums();
  }, []);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  if (loading) {
    return <p className="text-gray-500">Loading albums...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  console.log("albumssss --->", albums);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {albums.length > 0 ? (
          albums.map((album: Album) => (
            <div
              key={album._id}
              className="p-4 bg-gray-900 rounded-lg shadow-md md:py-6 md:px-5"
            >
              {/*  <p className="text-lg">Artist: {album.artist}</p>*/}
              {album.image && (
                <Image
                  isZoomed
                  src={album.image}
                  alt={album.name}
                  width={200}
                  height={200}
                  className="rounded-lg w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110"
                />
              )}
              {/*  <p>
                Songs:{" "}
                {album.songs?.length > 0
                  ? album.songs.map((song) => song.name).join(", ")
                  : "No songs listed"}
              </p>
              <p>
                Genre:{" "}
                {Array.isArray(album.genre)
                  ? album.genre.join(", ")
                  : "No genre listed"}
              </p> */}
              <h3 className="text-lg font-bold mt-2 text-white">
                {album.name}
              </h3>
              <p className="text-sm text-zinc-400">{album.year} • Album</p>
            </div>
          ))
        ) : (
          <div className="col-span-4 p-4 bg-gray-900 rounded-lg shadow-md min-h-[200px] flex flex-col items-center justify-center">
            <p className="text-gray-500">No albums found.</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
              onClick={toggleModal} // Muestra el formulario al hacer clic
            >
              Create Album
            </button>
          </div>
        )}
        {albums.length > 0 && (
          <div
            className="p-4 bg-gray-900 rounded-lg shadow-md flex justify-center items-center cursor-pointer min-h-[200px]"
            onClick={toggleModal}
          >
            <span className="text-5xl text-gray-600">+</span>
          </div>
        )}
        {isModalOpen && <CreateAlbum closeModal={toggleModal} />}
      </div>
    </div>
  );
}
