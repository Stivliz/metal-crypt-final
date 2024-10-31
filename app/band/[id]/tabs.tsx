"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import AlbumDataBand from "./bandAlbum";
import SongDataBand from "./bandSong";

const TabsBand = ({ albums }: any) => {
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
      <Tabs aria-label="Options">
        <Tab key="description" title="Description">
          <Card>
            <CardBody className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
