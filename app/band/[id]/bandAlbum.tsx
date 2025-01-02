//import Image from "next/image";
"use client";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import SongModal from "./songModal";
import { useState } from "react";

interface AlbumParams {
  _id: string;
  name: string;
  artist: string;
  image: string;
  releaseType: string;
  year: number;
  genre: string[];
}
interface BandParams {
  _id: string;
  bandname: string;
  genre: string[]; // Puede ser undefined o vacío, entonces usamos el encadenamiento opcional
  logoBand: string;
  formedDate: string;
  albums: AlbumParams[];
}

const AlbumDataBand = ({ albums }: { albums: AlbumParams[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSongOpen, setIsModalSongOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumParams | null>(null);

  const openModal = (songs: string[]) => {
    setSelectedSongs(songs);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedSongs([]);
  };

  const toggleModal = {
    openModalForm: function () {
      return setIsModalOpen(!isModalOpen);
    },
    openModalSong: function (album: AlbumParams) {
      setSelectedAlbum(album);
      return setIsModalSongOpen(!isModalSongOpen);
    },
  };
  const prueba = albums.map((m: any) => console.log("pruebas in album:", m));

  return (
    <>
      <div className="mt-8s overflow-x-auto">
        <div className="flex items-center gap-2">
          {/* Verificación de que existan álbumes */}
          {albums.length > 0 ? (
            albums
              .map((album: AlbumParams) => (
                <div
                  key={album._id}
                  className="min-w-[200px] p-4 mb-2 bg-gray-800 rounded-lg shadow-md md:py-6 md:px-5"
                >
                  {album.image && (
                    <button onClick={() => toggleModal.openModalSong(album)}>
                      <Image
                        isZoomed
                        src={album.image}
                        alt={album.name}
                        width={150}
                        height={150}
                        className="rounded-lg w-[100] h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110"
                      />
                    </button>
                  )}
                  <h3 className="text-lg font-bold mt-2 text-white">
                    {album.name}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {album.year} • {album.releaseType?.toUpperCase()}
                  </p>
                </div>
              ))
              .reverse()
          ) : (
            <div className="col-span-4 p-4 bg-gray-900 rounded-lg shadow-md min-h-[200px] flex flex-col items-center justify-center">
              <p className="text-gray-500">No albums found.</p>
            </div>
          )}
        </div>
      </div>
      {/* Modal para mostrar las canciones del álbum */}
      {isModalSongOpen && selectedAlbum && (
        <SongModal
          album={selectedAlbum}
          closeModal={toggleModal.openModalSong}
        />
      )}
      {/*<SongModal isOpen={isOpen} onClose={closeModal} songs={selectedSongs} />*/}
    </>
  );
};

export default AlbumDataBand;
