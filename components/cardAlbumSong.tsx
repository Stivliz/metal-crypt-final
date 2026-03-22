"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AlbumSongsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (songs: string[]) => void;
  songs: { name: string }[]; // Recibimos las canciones del componente padre
}

const CardAlbumSong: React.FC<AlbumSongsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  songs,
}) => {
  const [currentSongs, setcurrentSongs] = useState<string[]>([""]);

  useEffect(() => {
    // Cuando se abre el modal, actualizamos las canciones con las del componente padre
    setcurrentSongs(songs.map((song) => song.name));
  }, [isOpen, songs]);

  const maxSongs = 20; // Máximo de canciones permitido

  const handleSongChange = (index: number, value: string) => {
    const updatedSongs = [...currentSongs];
    updatedSongs[index] = value;
    setcurrentSongs(updatedSongs);
  };

  const addSong = () => {
    if (songs.length < maxSongs) {
      setcurrentSongs([...currentSongs, ""]);
    }
  };

  const removeSong = (index: number) => {
    const updatedSongs = currentSongs.filter((_, i) => i !== index);
    setcurrentSongs(updatedSongs);
  };

  const handleConfirm = () => {
    // Filtrar canciones vacías antes de enviar
    const validSongs = currentSongs.filter((song) => song.trim() !== "");
    onConfirm(validSongs);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-[200] bg-black/80 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.9)] w-full max-w-md mx-4 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-10">
              <h2 className="text-lg font-bold text-white tracking-widest uppercase">
                Listado de Pistas
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto relative z-10">
              <div className="space-y-4">
                {currentSongs.map((song, index) => (
                  <div key={index} className="flex gap-3 items-center group">
                    <span className="text-xs font-bold text-gray-500 w-5">{index + 1}.</span>
                    <input
                      type="text"
                      placeholder={`Nombre de pista`}
                      value={song}
                      onChange={(e) => handleSongChange(index, e.target.value)}
                      className="flex-1 px-2 py-2 bg-transparent border-b border-gray-600 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => removeSong(index)}
                      className="text-gray-500 hover:text-red-500 transition-colors p-2"
                      disabled={currentSongs.length === 1} // No eliminar si solo hay una canción
                      title="Eliminar pista"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 space-y-4 relative z-10">
              <button
                type="button"
                onClick={addSong}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 hover:bg-gray-800 hover:border-gray-500 text-white text-xs font-bold tracking-widest uppercase rounded transition-all"
                disabled={currentSongs.length >= maxSongs} // Deshabilitar al alcanzar el máximo
              >
                + Añadir Pista
              </button>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 border border-gray-600 hover:border-white text-white text-xs font-bold tracking-widest uppercase rounded transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                >
                  Guardar ({currentSongs.filter(s => s.trim() !== "").length})
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CardAlbumSong;

/*"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface AlbumSongsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (songs: string[]) => void;
  releaseType: "SINGLE" | "EP" | "ALBUM"; // Agregamos releaseType como prop
}

const CardAlbumSong: React.FC<AlbumSongsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  releaseType,
}) => {
  const [songs, setSongs] = useState<string[]>([""]);
  const [canAddMoreSongs, setCanAddMoreSongs] = useState(true);

  // Definir límites de canciones según el tipo de lanzamiento
  const getSongLimits = () => {
    switch (releaseType) {
      case "SINGLE":
        return { min: 1, max: 1 };
      case "EP":
        return { min: 4, max: 6 };
      case "ALBUM":
        return { min: 7, max: Infinity };
      default:
        return { min: 1, max: Infinity };
    }
  };

  const { min, max } = getSongLimits();

  // Verificar si el botón "Agregar Canción" debe estar deshabilitado
  useEffect(() => {
    setCanAddMoreSongs(songs.length < max);
  }, [songs, max]);

  const handleSongChange = (index: number, value: string) => {
    const updatedSongs = [...songs];
    updatedSongs[index] = value;
    setSongs(updatedSongs);
  };

  const addSong = () => {
    if (songs.length < max) {
      setSongs([...songs, ""]);
    }
  };

  const removeSong = (index: number) => {
    if (songs.length > min) {
      const updatedSongs = songs.filter((_, i) => i !== index);
      setSongs(updatedSongs);
    }
  };

  const handleConfirm = () => {
    if (songs.length >= min && songs.length <= max) {
      onConfirm(songs);
      onClose();
    } else {
      Swal.fire(`El número de canciones debe ser entre ${min} y ${max}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header *
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

        {/* Content *
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
                {songs.length > min && (
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

        {/* Footer
        <div className="p-4 border-t border-zinc-700 space-y-4">
          <button
            type="button"
            onClick={addSong}
            className="w-full px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md transition-colors"
            disabled={!canAddMoreSongs} // Deshabilitar si se alcanza el límite
          >
            + Agregar Canción
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-md transition-colors"
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
*/
