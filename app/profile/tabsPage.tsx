"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { AlbumList } from "./album/albumList";
import CreateSong from "./song/createSong";
import SongList from "./song/songList";

const TabsPage = () => {
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
        <Tab key="discography" title="Discography">
          <Card>
            <CardBody>
              <AlbumList />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="songs" title="Songs">
          <Card>
            <CardBody className="text-gray-500 py-3">
              <SongList />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsPage;
