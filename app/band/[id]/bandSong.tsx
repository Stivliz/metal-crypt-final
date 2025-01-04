"use client";
import { useState, useEffect } from "react";
import SongService from "@/services/song.service";
import { Image } from "@nextui-org/react";

interface SongParams {
  _id: string;
  name: string;
  artist: string;
  image: string | undefined;
  duration: number;
  genre: string[];
  year: string;
}

const SongDataBand = ({ songs }: { songs: SongParams[] }) => {
  return (
    <div className="text-white py-5 rounded-lg shadow-md">
      {songs.length > 0 && (
        <div className="w-full flex items-center border-b border-gray-700 pb-3 mb-3">
          <div className="w-8 text-center">#</div>
          <div className="flex-1 pl-3">Title</div>
          <div className="hidden lg:block w-48">Artist</div>
          <div className="w-24 md:w-36">Genre</div>
          <div className="hidden md:block w-28 ">Discography</div>
        </div>
      )}
      <div>
        {songs.length > 0 ? (
          songs
            .map((song: any, index: any) => (
              <div
                key={song._id}
                className="flex  w-full items-center py-2 hover:bg-gray-800 rounded-md"
              >
                <div className="w-8 text-center">{songs.length - index}.</div>
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
                </div>
              </div>
            ))
            .reverse()
        ) : (
          <p className="text-gray-500">No songs found.</p>
        )}
      </div>
    </div>
  );
};

export default SongDataBand;
