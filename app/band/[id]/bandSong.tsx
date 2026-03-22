"use client";
import { useState, useEffect } from "react";

interface SongParams {
  _id: string;
  name: string;
  artist: string;
  image: string | undefined;
  duration: number;
  genre: string[];
  year: string;
  releaseType: string;
}

const SongDataBand = ({ songs }: { songs: SongParams[] }) => {
  return (
    <div className="text-white py-5 rounded-lg w-full">
      {songs.length > 0 && (
        <div className="w-full flex items-center border-b border-white/10 pb-4 mb-4 text-xs font-bold text-gray-500 tracking-widest uppercase">
          <div className="w-12 text-center">#</div>
          <div className="flex-1 pl-3">Track</div>
          <div className="hidden lg:block w-48">Artist</div>
          <div className="w-24 md:w-36">Genre</div>
          <div className="hidden md:block w-32">Release Type</div>
        </div>
      )}
      <div className="space-y-2">
        {songs.length > 0 ? (
          songs
            .map((song: any, index: any) => (
              <div
                key={song._id}
                className="flex w-full items-center p-3 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/5"
              >
                <div className="w-12 text-center text-gray-500 font-bold text-sm tracking-widest">{(songs.length - index).toString().padStart(2, '0')}</div>
                <div className="flex items-center flex-1 pl-3 overflow-hidden">
                  {song.image ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-md border border-white/10 relative">
                      <img
                        src={song.image}
                        alt={song.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-900 border border-white/10 flex-shrink-0" />
                  )}
                  <span className="ml-4 font-semibold tracking-wider text-sm truncate pr-2">{song.name}</span>
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
          <div className="w-full text-center py-10">
            <p className="text-gray-500 italic tracking-wider text-sm">Esta banda no ha subido canciones individuales aún.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongDataBand;
