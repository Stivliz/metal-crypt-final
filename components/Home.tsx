"use client";
import { useState, useEffect } from "react";
import BandsService from "@/services/bands.service";
import PaginationComponent from "@/components/PaginationComponent";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
            ?.map((e, index) => (
              <motion.div
                key={e._id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 min-w-min mx-4 mb-8"
              >
                <Link href={`/band/${e._id}`} className="flex flex-col items-center block w-full h-full p-4 group">
                  <Image
                    width={250}
                    height={250}
                    src={e.logoBand}
                    alt={e.bandname}
                    className="rounded-lg mb-2 object-cover shadow-lg"
                  />
                  <h2 className="text-center font-bold text-xl mt-3 tracking-wide text-white group-hover:text-gray-200 transition-colors uppercase">{e.bandname}</h2>
                  <p className="text-center break-words text-gray-400 mt-1 text-sm">
                    {
                      `${e.genre.length > 1 ? 'Genres' : 'Genre'} - ${e.genre}`
                    }
                  </p>
                </Link>
              </motion.div>
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
