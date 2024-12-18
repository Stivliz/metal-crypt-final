"use client";
import { useState, useEffect } from "react";
import BandsService from "@/services/bands.service";
import PaginationComponent from "@/components/PaginationComponent";
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

  const [currentPage, setCurrentPage] = useState(1);
	const [elementPerPage, setElementPerPage] = useState(9);
	const indexOfLastCatalogue = currentPage * elementPerPage;
	const indexOfFirstCatalogue = indexOfLastCatalogue - elementPerPage;

  const currentBands = bands.slice(
		indexOfFirstCatalogue,
		indexOfLastCatalogue
	);

  const pagination = (pageNumber:number) => {
		setCurrentPage(pageNumber);
	};
  
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
    <div className="bg-black h-[100%] ">
      <div className="flex items-center justify-center mt-16">
        <div className="grid place-items-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 ">

          { !currentBands.length ? (<div className="text-white flex justify-center items-center w-[100%]">LOADING DATA...</div>):
          
          (currentBands
            ?.map((e) => (
              <div
                key={e._id}
                className="flex flex-col items-center border border-white min-w-min mx-16"
              >
                <Link href={`/band/${e._id}`}>
                  <Image
                    width={250}
                    height={250}
                    src={e.logoBand}
                    alt="photo"
                  />
                  <h2 className="text-center">{e.bandname}</h2>
                  <p className="text-center break-words">
                    {
                      `${e.genre.length > 1 ? 'Genres' : 'Genre'} - ${e.genre}`
                    }
                </p>
                </Link>
              </div>
            ))
            .reverse())}

        </div>
      </div>
      <PaginationComponent 				
            elementPerPage={elementPerPage}
            element={bands.length}
            pagination={pagination}
        /> 
    </div>
  );
};

export default BandsHome;
