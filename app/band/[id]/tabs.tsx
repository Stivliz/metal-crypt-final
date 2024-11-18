"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import AlbumDataBand from "./bandAlbum";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import BandsService from "@/services/bands.service";
import SongDataBand from "./bandSong";

const TabsBand = ({ albums, bandId }: { albums: any; bandId: string }) => {

  const [bandDescription, setBandDescription] = useState<string | null>(null);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const $Description = new BandsService();
        const response = await $Description.fetchBandDescription(bandId);
        setBandDescription(response);
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };

    fetchDescription();
  }, [bandId]);

  const songs = albums.flatMap((album: any) =>
    album.songs.map((song: any) => ({
      _id: song._id,
      name: song.name,
      artist: album.artist, // Usando el artista del álbum
      image: album.image, // La imagen de la canción, si está disponible
      duration: song.duration,
      genre: song.genre || album.genre, // Usando el género del álbum si la canción no tiene uno
      year: album.year.toString(), // Año del álbum
      releaseType: album.releaseType, // Tipo de lanzamiento del álbum
    })),
  );


  return (
    <div className="flex w-full flex-col ">
      <Tabs aria-label="Dynamic tabs" >
        <Tab key="description" title="Description">
          <Card>
            <CardBody>
              {bandDescription==null ? (<p>No info</p>) : (<p>{bandDescription}</p>)}
            </CardBody>
          </Card>
        </Tab>
        <Tab key="albums" title="Albums">
          <Card>
            <CardBody>
              <AlbumDataBand albums={albums} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="songs" title="Songs">
          <Card>
            <CardBody className="text-gray-500">
              <SongDataBand songs={songs} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsBand;
