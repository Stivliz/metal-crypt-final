import axios from "axios";


interface singin {
    bandname: string;
    password: string;
}

interface singUp {
  bandname:string,
  password:string,
  logoBand:File | null,
  genre:string[],
  formedDate:string,
}

export default class Authservice {

    API_URL: string | undefined;
    token: string | null;

    constructor(token = null) {
        this.API_URL = process.env.NEXT_PUBLIC_API_MC_URL;
        this.token = token;
    }



    async singin({bandname, password}:singin) {
        try {
            const {data} = await axios.post(`${this.API_URL}/login/login`, {
                bandname,
                password
            })
            console.log(this.API_URL);
            console.log(data);

            return {status: true, data}
        } catch(error:any) {
            return { status: false, data: error }
        }
    }

    async signup(formData: FormData) {
      try {
        const { data } = await axios.post(`${this.API_URL}/login/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return { status: true, data };
      } catch (error: any) {
        return { status: false, data: error.response?.data || 'An unknown error occurred' };
      }
    }
}
