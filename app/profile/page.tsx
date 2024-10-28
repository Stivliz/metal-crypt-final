"use client";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import { CreateAlbum } from "./album/formAlbum";
import NavRoot from "@/components/NavRoot";
import NavBar from "@/components/NavBar";
import { AlbumList } from "./album/album";
import BandDescriptionForm from "@/components/BandDescriptionForm";

const Profile = () => {
  const [cookie, setCookie] = useState({
    band_id: null,
    bandname: null,
    genre: null,
    logoBand: "",
    formedDate: null,
    description: null
  });

  const [description, setDescription] = useState<string>("");

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

  
  useEffect(() => {
    if (cookie.description) {
      setDescription(cookie.description);
    }
  }, [cookie.description]);

  const handleUpdateDescription = (newDescription: string) => {
    setDescription(newDescription);
  };

  console.log(cookie.description)
  console.log(description);
  
  return (
    <div>
      <NavBar />
      <NavRoot />

      <p>ID: {cookie.band_id}</p>
      <Image width={400} height={400} src={cookie.logoBand} alt="photo" />
      <p>bandname: {cookie.bandname}</p>
      <p>genre: {cookie.genre}</p>
      <p>formedDate: {cookie.formedDate}</p>
      <div>{
        description
          ? 
          (<div>{description}</div>) 
          : 
          (<div> 
            <p>No info, add a description </p> 
            <form className="bg-black p-6 rounded-lg shadow-lg max-w-md mx-auto">
                  <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="description">
                    Band Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    // rows="6"
                    className="w-full px-3 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-violet-500"
                    placeholder="Write a brief description of the band..."
                  ></textarea>
                  
                  <button
                    type="submit"
                    className="mt-4 w-full py-2 bg-violet-700 text-gray-200 rounded-lg font-bold uppercase tracking-widest hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
                  >
                    Submit
                  </button>
              </form>
          </div>)
        
      }</div>
      <BandDescriptionForm 
        idBand={cookie.band_id} 
        initialDescriptionBand={cookie.description}
        onUpdateDescription={handleUpdateDescription}
      />

      <div>Discography</div>
      <div>
        <CreateAlbum />
      </div>
      <div>
        <AlbumList />
      </div>
    </div>
  );
};

export default Profile;
