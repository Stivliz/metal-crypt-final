import axios from "axios";

export default class NewServices {
  API_URL: string | undefined;

  constructor(token = null) {
    this.API_URL = process.env.NEXT_PUBLIC_API_MC_URL;
  }

  async News() {
    try {
      const { data } = await axios.get(`${this.API_URL}/news`, {});
      return { status: true, data };
    } catch (error: any) {
      return { status: false, data: error };
    }
  }
}
