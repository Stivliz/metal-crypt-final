import { Metadata } from "next";
import BandsService from "@/services/bands.service";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import NavRoot from "@/components/NavRoot";
import AlbumDataBand from "./bandAlbum";
import TabsBand from "./tabs";
import Footer from "@/components/Footer";

interface BandParams {
  _id: string;
  bandname: string;
  genre: string[]; // Puede ser undefined o vacío, entonces usamos el encadenamiento opcional
  logoBand: string;
  formedDate: string;
  albums: AlbumParams[];
  songs: SongParams[];
}

interface AlbumParams {
  _id: string;
  name: string;
  artist: string;
  image: string;
  year: number;
  genre: string[];
}

interface SongParams {
  _id: string;
  name: string;
  artist: string;
  image: string | undefined;
  duration: number;
  releaseType: string;
  genre: string[];
  year: string;
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
      <div className="flex flex-col items-center bg-black">
        <div className="w-[60%]">
          <div className="sm:flex">
            <div>
              <h2 className="text-3xl">
                {data?.bandname ?? "Band name not available"}
              </h2>

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
            </div>

            <div className="pt-9 pl-5">
              <div className="text-red-800 flex">
                Genre:{" "}
                <p className="text-white ml-12">
                  {data?.genre?.join(", ") || "Genres not available"}
                </p>{" "}
              </div>
              <div className="text-red-800 flex">
                Formed in:
                <p className="text-white ml-4">
                  {/* Manejo de fechas con verificación */}
                  {data?.formedDate
                    ? new Date(data.formedDate).toISOString().split("T")[0]
                    : "Formed date not available"}
                </p>
              </div>
            </div>
          </div>
          {/* Encadenamiento opcional para evitar error si genre es undefined */}
          {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p> */}

          {/* Renderizando los álbumes de la banda */}
          <div className="my-10">
            <TabsBand albums={data.albums} bandId={data._id} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BandPage;
