"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { AlbumList } from "./albumList";

const TabsAlbum = () => {
  return (
    <div className="flex w-full flex-col  relative">
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
              <AlbumList />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="songs" title="Songs">
          <Card>
            <CardBody className="text-gray-500 py-3">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsAlbum;
