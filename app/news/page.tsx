"use client";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import NewServices from "@/services/news.service";

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
    <div>
      {data.length ? (
        data.map((news: Data) => (
          <div key={news._id}>
            <h3 className="text-lg font-bold mt-2 text-white">{news.title}</h3>
            <p>{news.img}</p>
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
  );
};

export default DataNews;
