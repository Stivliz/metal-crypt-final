import axios from "axios";
import Cookies from "universal-cookie";

interface SongForm {
  name: string;
  artist: string;
  image: string | undefined;
  duration: number;
  genre: string[];
  year: string;
}

export default class SongService {
  API_URL: string | undefined;
  token: string | null;

  constructor(token = null) {
    this.API_URL = process.env.NEXT_PUBLIC_API_MC_URL;
    this.token = token;
  }

  async PostSong(song: SongForm) {
    try {
      const cookies = new Cookies();
      const tokenCookies = cookies.get("token");
      const { data } = await axios.post(`${this.API_URL}/song`, song, {
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

  async getSong() {
    try {
      const cookies = new Cookies();
      const tokenCookies = cookies.get("token") || "";
      let url = `${this.API_URL}/songs`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenCookies.toString()}`,
        },
      });
      console.log("*** songData -->", response.data);
      return { status: true, data: response.data };
    } catch (error: any) {
      console.error("Error fetching songs:", error);
      return { status: false, data: [] };
    }
  }
}
