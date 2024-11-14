"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import AlbumDataBand from "./bandAlbum";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import BandsService from "@/services/bands.service";

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


  return (
    <div className="flex w-full flex-col ">
      <Tabs aria-label="Options">
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
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsBand;
