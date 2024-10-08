import { Metadata } from "next";
import BandsService from "@/services/bands.service";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import NavRoot from "@/components/NavRoot";

interface BandParams {
  _id: string;
  bandname: string;
  genre: string[]; // Puede ser undefined o vacío, entonces usamos el encadenamiento opcional
  logoBand: string;
  formedDate: string;
  albums: AlbumParams[];
}

interface AlbumParams {
  _id: string;
  name: string;
  artist: string;
  image: string;
  year: number;
  genre: string[];
}

interface BandResponse {
  status: boolean;
  data?: BandParams; // "data" puede ser opcional
}

interface ParamsBand {
  id: string;
}

export async function generateStaticParams() {
  const $Band = new BandsService();
  const response = await $Band.getBands();

  if (!response.status) {
    throw new Error("Error fetching bands");
  }

  const bands = response.data;

  return bands?.map((band: BandParams) => ({
    id: band._id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: ParamsBand;
}): Promise<Metadata> {
  const $Band = new BandsService();
  const band: BandResponse = await $Band.getBandById(params.id);

  if (!band.status || !band.data) {
    return {
      title: "Band Not Found",
      description: "Details about the band are not available",
    };
  }

  return {
    title: band.data.bandname,
    description: `Details about ${band.data.bandname}`,
  };
}

const BandPage = async ({ params }: { params: ParamsBand }) => {
  const $Band = new BandsService();
  const band: BandResponse = await $Band.getBandById(params.id);

  if (!band.status || !band.data) {
    return <div>Error loading band details</div>;
  }

  const data: BandParams | undefined = band.data;

  return (
    <div>
      <NavBar />
      <NavRoot />
      <div className="flex flex-col items-center h-[100vh] bg-black">
        <div className="w-[60%]">
          <h1>{data?.bandname ?? "Band name not available"}</h1>
          {/* Encadenamiento opcional para evitar error si genre es undefined */}
          <p>{data?.genre?.join(", ") || "Genres not available"}</p>
          {data?.logoBand ? (
            <Image
              width={200}
              height={200}
              src={data.logoBand}
              alt="band logo"
            />
          ) : (
            <p>Logo not available</p>
          )}
          <p>
            {/* Manejo de fechas con verificación */}
            {data?.formedDate
              ? new Date(data.formedDate).toISOString().split("T")[0]
              : "Formed date not available"}
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>

          {/* Renderizando los álbumes de la banda */}
          <div className="mt-6">
            <h2 className="text-xl text-white mb-4">Albums</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Verificación de que existan álbumes */}
              {data?.albums && data.albums.length > 0 ? (
                data.albums.map((album: AlbumParams) => (
                  <div
                    key={album._id}
                    className="p-4 bg-gray-800 rounded-lg shadow-md"
                  >
                    <Image
                      src={album.image}
                      alt={`${album.name} album cover`}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <h3 className="text-lg font-bold mt-2 text-white">
                      {album.name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      Artist: {album.artist}
                    </p>
                    <p className="text-sm text-gray-300">Year: {album.year}</p>
                    <p className="text-sm text-gray-300">
                      Genre: {album.genre?.join(", ") || "Genre not available"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No albums found for this band.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandPage;
