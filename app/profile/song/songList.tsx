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
        console.log("result inside songList(profile) -->", result);
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

  console.log("songs desde SONGLIST(profile/song)", songs);

  return (
    <div className=" rounded-lg shadow-md">
      {songs.length > 0 ? (
        <div className="flex items-center border-b border-gray-700 pb-3 mb-3">
          <div className="w-8 text-center">#</div>
          <div className="flex-1 pl-3">Title</div>
          <div className="hidden lg:block w-48">Artist</div>
          <div className="flex items-end w-24 md:w-36">Genre</div>
          <div className="hidden md:block w-28 ">Discography</div>
        </div>
      ) : (
        <div className="col-span-4 p-4 bg-gray-900 rounded-lg shadow-md min-h-[200px] flex flex-col items-center justify-center">
          <p className="text-gray-500">No songs found.</p>
        </div>
      )}
      <div>
        {songs.length > 0 &&
          songs
            .map((song, index) => (
              <div
                key={song._id}
                className="flex items-end py-2 hover:bg-gray-800 rounded-md"
              >
                <div className="w-8 text-center">{index + 1}.</div>
                <div className="flex items-center flex-1 pl-3">
                  <Image
                    src={song.image}
                    alt={song.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <span className="ml-3">{song.name}</span>
                </div>
                <div className="hidden lg:block  w-48">{song.artist}</div>
                <div className="w-24 md:w-36">{song.genre}</div>
                <div className="hidden md:block  w-28 ">
                  {song.releaseType.toUpperCase()}
                </div>{" "}
                <hr />
              </div>
            ))
            .reverse()}{" "}
        {/* : (
          <div className="col-span-4 p-4 bg-gray-900 rounded-lg shadow-md min-h-[200px] flex flex-col items-center justify-center">
            <p className="text-gray-500">No songs found.</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
              onClick={toggleModal.openModalForm} // Muestra el formulario al hacer clic
            >
              Create Song
            </button>
          </div>
        )
        songs.length > 0 && (
          <div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
              onClick={toggleModal.openModalForm} // Muestra el formulario al hacer clic
            >
              Create Song
            </button>
          </div>
          )*/}
      </div>
    </div>
  );
};

export default SongList;
