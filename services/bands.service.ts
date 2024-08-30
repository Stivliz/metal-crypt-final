import axios from "axios";

export default class BandsService {
    API_URL: string | undefined;    
    token: string | null;

    constructor(token = null) {
        this.API_URL = process.env.API_MC_URL;
        this.token = token;
    }

    async getBands() {
        try {
            const {data} = await axios.get('http://localhost:3002/api/v1/bands')
            return {status:true, data}
        }catch(error:any) {
            return { status: false, data: error }
        }
    }

    async getBandById(_id:string) {
        try {
            const {data} = await axios.get(`http://localhost:3002/api/v1/bands/band/${_id}`)
            
            return {status:true, data}
        } catch (error) {
            return { status: false, data: error }
        }
    }
}