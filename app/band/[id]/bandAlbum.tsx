//import Image from "next/image";
"use client";
import { Image } from "@nextui-org/react";
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

const AlbumDataBand = ({ albums }: { albums: AlbumParams[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSongOpen, setIsModalSongOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumParams | null>(null);

  const toggleModal = {
    openModalForm: function () {
      return setIsModalOpen(!isModalOpen);
    },
    openModalSong: function (album: AlbumParams) {
      setSelectedAlbum(album);
      return setIsModalSongOpen(!isModalSongOpen);
    },
  };

  return (
    <>
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-4">
          {/* Verificación de que existan álbumes */}
          {albums.length > 0 ? (
            albums
              .map((album: AlbumParams) => (
                <div
                  key={album._id}
                  className="min-w-[220px] w-[220px] flex flex-col p-4 bg-black/60 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all rounded-2xl shadow-lg gap-3"
                >
                  {album.image ? (
                    <button onClick={() => toggleModal.openModalSong(album)} className="w-full aspect-square rounded-xl overflow-hidden flex-shrink-0 bg-black relative group">
                      <img
                        src={album.image}
                        alt={album.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </button>
                  ) : (
                    <button onClick={() => toggleModal.openModalSong(album)} className="w-full aspect-square flex-shrink-0 flex items-center justify-center bg-gray-900 rounded-xl relative group overflow-hidden">
                      <span className="text-gray-500 text-xs uppercase tracking-widest absolute z-10">Sin Portada</span>
                      <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    </button>
                  )}
                  <div className="text-center w-full px-1">
                    <h3 className="text-base font-black text-white tracking-widest uppercase truncate w-full drop-shadow-md" title={album.name}>
                      {album.name}
                    </h3>
                    <p className="text-xs text-gray-400 tracking-wider font-semibold mt-1">
                      {album.year} • {album.releaseType?.toUpperCase() || "ALBUM"}
                    </p>
                  </div>
                </div>
              ))
              .reverse()
          ) : (
            <div className="p-4 flex items-center justify-center h-[200px] w-full">
              <p className="text-gray-500 italic tracking-wider text-sm">Esta banda no ha subido discografía aún.</p>
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
    </>
  );
};

export default AlbumDataBand;
