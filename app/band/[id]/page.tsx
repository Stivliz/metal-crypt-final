import { Metadata } from 'next';
import BandsService from '@/services/bands.service';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import NavRoot from '@/components/NavRoot';

interface BandParams {
    _id: string;
    data: {
        bandname: string;
        genre: string[];
        logoBand: string;
        formedDate: string;
    };
}

interface BandResponse {
    status: boolean;
    data: BandParams;
}

interface ParamsBand {
    id: string;
}

export async function generateStaticParams() {
    const $Band = new BandsService();
    const response = await $Band.getBands();

    if (!response.status) {
        throw new Error('Error fetching bands');
    }

    const bands = response.data;

    return bands?.map((band: BandParams) => ({
        id: band._id,
    }));
}

export async function generateMetadata({ params }: { params: ParamsBand }): Promise<Metadata> {
    const $Band = new BandsService();
    const band: BandResponse = await $Band.getBandById(params.id);

    if (!band.status || !band.data || !band.data.data) {
        return {
            title: 'Band Not Found',
            description: 'Details about the band are not available',
        };
    }

    return {
        title: band.data.data.bandname,
        description: `Details about ${band.data.data.bandname}`,
    };
}

const BandPage = async ({ params }: { params: ParamsBand }) => {
    const $Band = new BandsService();
    console.log($Band);
    
    const band: BandResponse = await $Band.getBandById(params.id);

    console.log(band.data);
    

    // if (!band.status || !band.data || !band.data.data) {
    //     return <div>Error loading band details</div>;
    // }

    const data:any = band.data;
    console.log(data);
    
    return (
        <div>
            <NavBar />
            <NavRoot />
            <div className="flex flex-col items-center h-[100vh] bg-black">
                <div className="w-[60%]">
                    <h1>{data.bandname}</h1>
                    <p>{data.genre.join(', ')}</p>
                    <Image width={200} height={200} src={data.logoBand} alt="photo" />
                    <p>{new Date(data.formedDate).toISOString().split('T')[0]}</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                </div>
            </div>
        </div>
    );
};

export default BandPage;
