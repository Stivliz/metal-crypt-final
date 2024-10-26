"use client";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import { CreateAlbum } from "./album/createAlbum";
import NavRoot from "@/components/NavRoot";
import NavBar from "@/components/NavBar";
import TabsAlbum from "./album/tabsAlbum";

const Profile = () => {
  const [cookie, setCookie] = useState({
    band_id: null,
    bandname: null,
    genre: null,
    logoBand: "",
    formedDate: null,
  });

  useEffect(() => {
    const cookies = new Cookies();

    const band_id = cookies.get("band_id");
    const logoBand = cookies.get("logoBand");
    const bandname = cookies.get("bandname");
    const genre = cookies.get("genre");
    const formedDate = cookies.get("formedDate");

    setCookie({
      band_id,
      bandname,
      genre,
      logoBand,
      formedDate,
    });
  }, []);
  return (
    <div className="flex flex-col items-center h-[100vh] bg-black">
      <div className="w-[60%]">
        <NavBar />
        <NavRoot />
        <Image width={400} height={400} src={cookie.logoBand} alt="photo" />
        <p>bandname: {cookie.bandname}</p>
        <p>genre: {cookie.genre}</p>
        <div>Discography</div>
        <div className="mt-10 mb-16">
          <TabsAlbum />
        </div>
      </div>
    </div>
  );
};

export default Profile;
