"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AlbumService from "@/services/album.service";

interface Album {
  _id: string;
  name: string;
  artist: string;
  songs: string[];
  image: string;
  genre?: string[];
  year?: string;
}

export function AlbumList() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const $Album = new AlbumService();

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const result = await $Album.getAlbum();
        if (result.status) {
          setAlbums(result.data.message || []);
        } else {
          setError("Failed to fetch albums");
        }
      } catch (err) {
        setError("An error occurred while fetching albums");
      } finally {
        setLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  if (loading) {
    return <p>Loading albums...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  console.log("albumssss --->", albums);

  return (
    <div className="grid grid-cols-2 gap-4">
      {albums.length > 0 ? (
        albums.map((album: Album) => (
          <div key={album._id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-bold">{album.name}</h2>
            <p className="text-lg">Artist: {album.artist}</p>
            {album.image && (
              <Image
                src={album.image}
                alt={album.name}
                width={200}
                height={200}
                className="my-2"
              />
            )}
            <p>
              Songs:{" "}
              {album.songs?.length > 0
                ? album.songs.join(", ")
                : "No songs listed"}
            </p>
            <p>
              Genre:{" "}
              {Array.isArray(album.genre)
                ? album.genre.join(", ")
                : "No genre listed"}
            </p>
            <p>Year: {album.year || "Year not specified"}</p>
          </div>
        ))
      ) : (
        <p>No albums found.</p>
      )}
    </div>
  );
}
