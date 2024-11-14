"use client";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import NavRoot from "@/components/NavRoot";
import NavBar from "@/components/NavBar";

import TabsPage from "./tabsPage";

const Profile = () => {
  const [cookie, setCookie] = useState({
    band_id: null,
    bandname: null,
    genre: null,
    logoBand: "",
    formedDate: "",
    description: null
  });

  useEffect(() => {
    const cookies = new Cookies();

    const band_id = cookies.get("band_id");
    const logoBand = cookies.get("logoBand");
    const bandname = cookies.get("bandname");
    const genre = cookies.get("genre");
    const formedDate = cookies.get("formedDate");
    const description = cookies.get("description");
    
    setCookie({
      band_id,
      bandname,
      genre,
      logoBand,
      formedDate,
      description
    });
  }, []);

  return (
    <div>
      <NavBar />
      <NavRoot />
      <div>
    <div className="flex flex-col items-center h-[100vh]">
      <div className="w-[60%]">
        <div className="flex ">
          <div>
            <h2 className=" text-3xl">{cookie.bandname}</h2>
            <Image width={300} height={300} src={cookie.logoBand} alt="photo" />
          </div>
          <div className="pt-9 pl-5">
            <div className="text-red-800 flex">Genre: <p className="text-white ml-12"> {cookie.genre}</p> </div>
            <div className="text-red-800 flex">Formed in: <p className="text-white ml-4"> {new Date(cookie.formedDate).getFullYear()}</p> </div>
          </div>
        </div>
        <div className="mt-10 mb-16">
          <TabsPage />
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;
