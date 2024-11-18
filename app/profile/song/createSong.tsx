import React, { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
import SongService from "@/services/song.service";

interface SongForm {
  name: string;
  artist: string;
  image: string | undefined;
  duration: number;
  genre: string[];
  year: string;
}

const CreateSong = ({ closeModal }: any) => {
  const [song, setSong] = useState<SongForm>({
    name: "",
    artist: "",
    image: undefined,
    duration: 0,
    genre: [],
    year: "",
  });

  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const $Song = new SongService();

  const convertToBase64 = (file: File | null) => {
    return new Promise<string | undefined>((resolve, reject) => {
      if (!file) return resolve(undefined);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const base64Image = await convertToBase64(files[0]);
      setSong({
        ...song,
        image: base64Image,
      });
    } else if (name === "genre") {
      const genres = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      setSong({
        ...song,
        genre: genres,
      });
    } else {
      setSong({
        ...song,
        [name]: value,
      });
    }
    closeModal();
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = Math.max(0, parseInt(value) || 0);

    if (name === "minutes") {
      setMinutes(parsedValue);
      // Actualiza la duración total en segundos
      const totalSeconds = parsedValue * 60 + seconds;
      setSong((prev) => ({ ...prev, duration: totalSeconds }));
    } else if (name === "seconds") {
      // Asegura que los segundos estén entre 0 y 59
      const validSeconds = Math.min(59, parsedValue);
      setSeconds(validSeconds);
      // Actualiza la duración total en segundos
      const totalSeconds = minutes * 60 + validSeconds;
      setSong((prev) => ({ ...prev, duration: totalSeconds }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (song.duration === 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Duration",
        text: "Please enter a valid duration for the song",
      });
      return;
    }

    try {
      const response = await $Song.PostSong(song);

      if (response?.status === true) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Song created successfully",
        });
        // Opcional: limpiar el formulario después de crear
        resetForm();
      } else {
        throw new Error("Failed to create song");
      }
    } catch (error) {
      console.error("Error creating song:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create the song",
      });
    }
  };

  const resetForm = () => {
    setSong({
      name: "",
      artist: "",
      image: undefined,
      duration: 0,
      genre: [],
      year: "",
    });
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="fixed inset-0 flex justify-center items-center  top-0 left-0 right-0 bottom-0 z-50">
        <div className="bg-zinc-800 p-4 rounded-xl max-w-md mx-auto ">
          <div className="flex justify-end mx-auto">
            <button
              className="bg-gray-800 text-white py-1 px-3 font-semibold rounded-full shadow transition duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              onClick={() => closeModal()}
              aria-label="Close modal"
            >
              <span className="text-lg font-bold">✕</span>{" "}
              {/* O puedes usar "X" */}
            </button>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl max-w-md w-full mx-4">
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Song name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={song.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter song name"
                  required
                />
              </div>

              {/* Artist Input */}
              <div>
                <label
                  htmlFor="artist"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Artist
                </label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={song.artist}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter artist name"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white hover:file:bg-zinc-900"
                />
              </div>

              {/* Genre Input */}
              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Genre (comma-separated)
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Rock, Pop, Jazz"
                />
              </div>

              {/* Year Input */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Year
                </label>
                <input
                  type="date"
                  id="year"
                  name="year"
                  value={song.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />
              </div>

              {/* Duration Inputs */}

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Duration
                </label>
                <div className="flex space-x-2">
                  <div className="w-1/2">
                    <input
                      type="number"
                      name="minutes"
                      value={minutes}
                      onChange={handleDurationChange}
                      min="0"
                      className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Minutes"
                    />
                  </div>
                  <div className="w-1/2">
                    <input
                      type="number"
                      name="seconds"
                      value={seconds}
                      onChange={handleDurationChange}
                      min="0"
                      max="59"
                      className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Seconds"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-blue-950 hover:bg-blue-900 transition-colors duration-200 text-white font-medium rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
              >
                Create Song
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateSong;
