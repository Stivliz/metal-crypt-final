"use client";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import NewServices from "@/services/news.service";
import NavBar from "@/components/NavBar";
import NavRoot from "@/components/NavRoot";

interface Data {
  _id: string;
  title: string;
  description: string;
  link: string;
  img: string;
}

const DataNews = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const $New = new NewServices();

  async function fetchNews() {
    try {
      const result = await $New.News();
      if (result.status) {
        console.log(result.data);
        setData(result.data || []);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError("An error occurred while fetching News");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading albums...</p>;
  }

  return (
    <div className="h-[100vh]">
      <NavBar />
      <NavRoot />
      <div className="flex justify-center flex-col items-center">
        <div className="">
          {data.length ? (
            data.map((news: Data) => (
              <div
                key={news._id}
                className="flex flex-col items-center border border-white w-max mx-16"
              >
                <h3 className="text-lg font-bold mt-2 text-white">
                  {news.title}
                </h3>
                <Image
                  isZoomed
                  src={news.img}
                  alt={news.title}
                  width={150}
                  height={150}
                  className="rounded-lg w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110"
                />
                <p className="text-sm text-zinc-400">{news.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No news found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataNews;
