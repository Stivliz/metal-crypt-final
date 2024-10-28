"use client";
import { useState } from "react";

interface AlbumSongsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (songs: string[]) => void;
}

const CardAlbumSong: React.FC<AlbumSongsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [songs, setSongs] = useState<string[]>([""]);

  const handleSongChange = (index: number, value: string) => {
    const updatedSongs = [...songs];
    updatedSongs[index] = value;
    setSongs(updatedSongs);
  };

  const addSong = () => {
    setSongs([...songs, ""]);
  };

  const removeSong = (index: number) => {
    const updatedSongs = songs.filter((_, i) => i !== index);
    setSongs(updatedSongs);
  };

  const handleConfirm = () => {
    onConfirm(songs);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-700">
          <h2 className="text-xl font-semibold text-white">
            Agregar Canciones
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {songs.map((song, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Canción ${index + 1}`}
                  value={song}
                  onChange={(e) => handleSongChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md
                                                        text-white placeholder-gray-400 focus:outline-none focus:ring-2
                                                        focus:ring-blue-500 focus:border-transparent"
                />
                {songs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSong(index)}
                    className="px-3 py-2 text-gray-400 hover:text-red-400
                                                            hover:bg-red-400/10 rounded-md transition-colors"
                  >
                    🗑
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-700 space-y-4">
          <button
            type="button"
            onClick={addSong}
            className="w-full px-4 py-2 bg-zinc-700 hover:bg-zinc-600
                                            text-white rounded-md transition-colors"
          >
            + Agregar Canción
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-zinc-700 hover:bg-zinc-600
                                                text-white rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-blue-950 hover:bg-blue-900
                                                text-white rounded-md transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAlbumSong;
