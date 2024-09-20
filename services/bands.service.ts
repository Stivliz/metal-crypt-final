import axios from "axios";

export default class BandsService {
    API_URL: string | undefined;    
    token: string | null;

    constructor(token = null) {
        this.API_URL = process.env.NEXT_PUBLIC_ULR_PRODUCTION;
        this.token = token;
    }

    async getBands() {
        try {
            const {data} = await axios.get(`${this.API_URL}/bands`)
            return {status:true, data}
        }catch(error:any) {
            return { status: false, data: error }
        }
    }

    async getBandById(_id:string) {
        try {
            const {data} = await axios.get(`${this.API_URL}/bands/band/${_id}`)
            
            return {status:true, data}
        } catch (error) {
            return { status: false, data: error }
        }
    }


    async searchBandName(bandname:string) {
        try {
            const {data} = await axios.get(`${this.API_URL}/bands/band/search?bandname=${bandname}`)
            
            return {status:true, data}
        } catch (error) {
            return { status: false, data: error }
        }
    }
}