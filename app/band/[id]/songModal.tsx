import { motion, AnimatePresence } from "framer-motion";

const SongModal = ({ album, closeModal }: any) => {
  if (!album || !album.songs) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-[200] bg-black/80 backdrop-blur-md p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.9)] w-full max-w-md relative overflow-hidden flex flex-col max-h-[80vh]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
          
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
            onClick={closeModal}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
          
          <div className="p-6 border-b border-white/10 relative z-10 flex gap-4 items-center">
            {album.image ? (
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10">
                <img src={album.image} alt="Cover" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gray-900 border border-white/10 flex-shrink-0" />
            )}
            <div>
              <h2 className="text-lg font-bold text-white tracking-widest uppercase truncate w-full pr-4">{album.name}</h2>
              <p className="text-xs text-gray-400 tracking-wider mt-1">{album.songs.length} Pistas</p>
            </div>
          </div>
          
          <div className="p-4 overflow-y-auto custom-scrollbar relative z-10 space-y-2">
            {album.songs.map((song: any, index: any) => (
              <div
                key={index}
                className="flex items-center gap-3 hover:bg-white/5 rounded-lg p-3 transition-colors text-gray-300"
              >
                <span className="text-xs font-bold text-gray-500 w-5">{index + 1}.</span>
                <span className="text-sm font-semibold tracking-wider text-white">{song.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SongModal;
