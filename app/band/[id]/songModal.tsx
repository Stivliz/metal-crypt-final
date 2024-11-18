const SongModal = ({ album, closeModal }: any) => {
  if (!album || !album.songs) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-100"
          onClick={closeModal}
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold mb-4">Songs in {album.name}</h2>
        <div className="space-y-2">
          {album.songs.map((song: any, index: any) => (
            <p key={index} className="text-gray-300">
              {index + 1}. {song.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongModal;
