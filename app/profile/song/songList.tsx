"use client";
import { useState, useEffect } from "react";
import SongService from "@/services/song.service";
import { Image } from "@nextui-org/react";
import CreateSong from "./createSong";

interface Song {
  _id: string;
  name: string;
  artist: string;
  image: string | undefined;
  //duration: number;
  releaseType: string;
  genre: string[];
  year: string;
}

const SongList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSongOpen, setIsModalSongOpen] = useState(false);

  const $Song = new SongService();

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const result = await $Song.getSong();
        if (result.status) {
          setSongs(result.data.message || []);
        } else {
          setError("Failed to fetch songs");
        }
      } catch (err) {
        setError("An error occurred while fetching Songs");
      } finally {
        setLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  const toggleModal = {
    openModalForm: function () {
      return setIsModalOpen(!isModalOpen);
    },
  };
  if (loading) {
    return <p className="text-gray-500">Loading list...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="text-white py-5 w-full">
      {/* ENCABEZADOS DE TABLA */}
      {songs.length > 0 && (
        <div className="w-full flex items-center border-b border-white/10 pb-4 mb-4 text-xs font-bold text-gray-500 tracking-widest uppercase px-2">
          <div className="w-12 text-center">#</div>
          <div className="flex-1 pl-3">Track</div>
          <div className="hidden lg:block w-48">Artist</div>
          <div className="w-24 md:w-36">Genre</div>
          <div className="hidden md:block w-32">Release Type</div>
        </div>
      )}

      {/* LISTA DE CANCIONES */}
      <div className="space-y-2">
        {songs.length > 0 ? (
          songs
            .map((song, index) => (
              <div
                key={song._id}
                className="flex w-full items-center p-3 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/5 group"
              >
                <div className="w-12 text-center text-gray-500 font-bold text-sm tracking-widest">{(songs.length - index).toString().padStart(2, '0')}</div>
                <div className="flex items-center flex-1 pl-3 overflow-hidden">
                  {song.image ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-md border border-white/10 relative">
                      <img
                        src={song.image}
                        alt={song.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-900 border border-white/10 flex-shrink-0" />
                  )}
                  <span className="ml-4 font-semibold tracking-wider text-sm truncate pr-2 group-hover:text-white text-gray-300 transition-colors">{song.name}</span>
                </div>
                <div className="hidden lg:block w-48 text-gray-400 text-sm tracking-wider truncate px-2">{song.artist}</div>
                <div className="w-24 md:w-36 text-gray-400 text-xs tracking-wider truncate px-2">{Array.isArray(song.genre) ? song.genre.join(', ') : song.genre}</div>
                <div className="hidden md:block w-32">
                  <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-bold text-gray-300 tracking-widest uppercase">
                    {song.releaseType || "SINGLE"}
                  </span>
                </div>
              </div>
            ))
            .reverse()
        ) : (
          <div className="w-full flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg h-[200px]">
             <p className="text-gray-500 italic tracking-wider text-sm">No has forjado pistas individuales aún.</p>
          </div>
        )}
      </div>

      {/* BOTON ESTILIZADO DE AGREGAR CANCION */}
      <div className="mt-8">
        <button
          onClick={toggleModal.openModalForm}
          className="w-full py-4 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 border border-white/10 hover:border-white/30 transition-all rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] text-gray-300 hover:text-white font-black tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-3 group"
        >
          <span className="text-2xl font-light group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">+</span> Forjar Canción
        </button>
      </div>

      {/* Modal JSX Integration */}
      {isModalOpen && <CreateSong closeModal={toggleModal.openModalForm} />}
    </div>
  );
};

export default SongList;
