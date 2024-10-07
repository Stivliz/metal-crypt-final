"use client";
import { useState, useEffect } from "react";
import BandsService from "@/services/bands.service";
import Image from "next/image";
import Link from "next/link";

interface IntBands {
  _id: string;
  bandname: string;
  logoBand: string;
  genre: string;
  formedDate: string;
}

const BandsHome = () => {
  const [bands, setBands] = useState<IntBands[]>([]);
  const bandsService = new BandsService();

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const response = await bandsService.getBands();
        setBands(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBands();
  }, []); // Dependencias vacías, el efecto se ejecuta una vez

  return (
    <div className="bg-black h-[100%]">
      <div className="flex items-center justify-center mt-16">
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-[60%]">
          {bands
            ?.map((e) => (
              <div
                key={e._id}
                className="flex flex-col items-center border border-white w-max mx-16"
              >
                <Link href={`/band/${e._id}`}>
                  <Image
                    width={200}
                    height={200}
                    src={e.logoBand}
                    alt="photo"
                  />
                  <h2 className="text-center">{e.bandname}</h2>
                  <p className="text-center break-words w-48">
                    Genre/s: {e.genre}
                  </p>
                </Link>
                {/* <p className="text-center ">Formed: {new Date(e.formedDate).toISOString().split('T')[0]}</p> */}
              </div>
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
};

export default BandsHome;
