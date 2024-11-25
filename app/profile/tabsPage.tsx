"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { AlbumList } from "./album/albumList";
import CreateSong from "./song/createSong";
import SongList from "./song/songList";
import DescriptionProfile from "./description/descriptionProfile";
const TabsPage = () => {
  return (
    <div className="flex w-full flex-col  relative sm:w-[100%]">
      <Tabs aria-label="Options">
        <Tab key="description" title="Description">
          <Card>
            <CardBody className="text-gray-500">
                <DescriptionProfile />
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
