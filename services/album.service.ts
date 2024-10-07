import axios from "axios";
import Cookies from "universal-cookie";

interface Song {
  name: string;
}

interface FormAlbum {
  name: string;
  artist?: string;
  songs?: Song[];
  image?: string | undefined;
  genre?: string[];
  year?: string;
}

export default class AlbumService {
  API_URL: string | undefined;
  token: string | null;

  constructor(token = null) {
    this.API_URL = process.env.NEXT_PUBLIC_ULR_PRODUCTION;
    this.token = token;
  }

  async PostAlbum(album: FormAlbum) {
    try {
      const cookies = new Cookies();
      const tokenCookies = cookies.get("token") || "";
      console.log("* PostAlbum - token ---> ", tokenCookies);
      const { data } = await axios.post(`http://localhost:3002/album`, album, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenCookies.toString()}`,
        },
      });

      if (data) {
        return { status: true, data };
      }
    } catch (error: any) {
      return {
        status: false,
        data: error.response?.data || "An unknown error occurred",
      };
    }
  }

  async getAlbum(albumName?: string) {
    try {
      const cookies = new Cookies();
      const tokenCookies = cookies.get("token") || "";

      let url = `http://localhost:3002/albums`;
      // Agregar albumName a la URL si se proporciona
      if (albumName) {
        url += `?albumName=${encodeURIComponent(albumName)}`;
      }

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenCookies.toString()}`,
        },
      });
      return { status: true, data: response.data };
    } catch (error: any) {
      console.error("Error fetching albums:", error);
      return { status: false, data: [] };
    }
  }
}
