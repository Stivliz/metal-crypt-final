"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import AlbumDataBand from "./bandAlbum";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

const TabsBand = ({ albums }: any) => {

  const [cookie, setCookie] = useState({
    description: null
  });

  useEffect(() => {
    const cookies = new Cookies();
    const description = cookies.get("description");

    setCookie({
      description
    });
  }, []);

  return (
    <div className="flex w-full flex-col ">
      <Tabs aria-label="Options">
        <Tab key="description" title="Description">
          <Card>
            <CardBody>
              {cookie.description==null ? (<p>No info</p>) : (<p>{cookie.description}</p>)}
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
