"use client";

import { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
import AlbumService from "@/services/album.service";
import { CreateAlbum } from "./createAlbum";
import SongsAlbum from "./songsAlbum";

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
    <div className="overflow-x-auto pb-4">
      <div className="flex items-center gap-4">
        {/* ADD ALBUM BUTTON ALWAYS VISIBLE */}
        <div
          className="min-w-[220px] w-[220px] aspect-square p-6 bg-black/60 backdrop-blur-xl border border-white/10 hover:border-white/50 transition-all rounded-2xl shadow-lg flex flex-col justify-center items-center cursor-pointer group"
          onClick={toggleModal.openModalForm}
        >
          <span className="text-6xl text-gray-400 group-hover:text-white transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            +
          </span>
          <p className="mt-6 text-sm font-bold text-gray-400 group-hover:text-gray-200 tracking-widest uppercase text-center">Forjar Álbum</p>
        </div>

        {albums.length > 0 ? (
          albums
            .map((album: Album) => (
              <div
                key={album._id}
                className="min-w-[220px] w-[220px] flex flex-col p-4 bg-black/60 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all rounded-xl shadow-lg gap-3"
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
          <div className="p-4 flex items-center justify-center h-[200px]">
            <p className="text-gray-500 italic tracking-wider text-sm">Tu discografía está vacía. Es hora de crear tu legado.</p>
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
