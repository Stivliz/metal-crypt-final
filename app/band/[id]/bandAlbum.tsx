import Image from "next/image";

interface AlbumParams {
  _id: string;
  name: string;
  artist: string;
  image: string;
  year: number;
  genre: string[];
}
interface BandParams {
  _id: string;
  bandname: string;
  genre: string[]; // Puede ser undefined o vacío, entonces usamos el encadenamiento opcional
  logoBand: string;
  formedDate: string;
  albums: AlbumParams[];
}

const AlbumDataBand = ({ data }: { data: BandParams }) => {
  const dataone = data;
  return (
    <div className="mt-8s">
      <h2 className="text-xl text-white mb-4">Albums</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-4">
        {/* Verificación de que existan álbumes */}
        {dataone?.albums && dataone.albums.length > 0 ? (
          dataone.albums.map((album: AlbumParams) => (
            <div
              key={album._id}
              className="p-4 bg-gray-900 rounded-lg shadow-md md:py-6 md:px-5"
            >
              <Image
                src={album.image}
                alt={`${album.name} album cover`}
                width={150}
                height={150}
                className="rounded-lg w-full h-auto object-cover"
              />
              <h3 className="text-lg font-bold mt-2 text-white">
                {album.name}
              </h3>
              {/*<p className="text-sm text-gray-300">Artist: {album.artist}</p>*/}
              <p className="text-sm text-zinc-400">{album.year} • Album</p>
              {/* <p className="text-sm text-gray-300">
                Genre: {album.genre?.join(", ") || "Genre not available"}
                </p> */}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No albums found for this band.</p>
        )}
      </div>
    </div>
  );
};

export default AlbumDataBand;