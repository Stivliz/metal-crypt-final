import BandDescriptionForm from "@/components/BandDescriptionForm";
import { useState, useEffect} from "react";
import Cookies from "universal-cookie";

const DescriptionProfile = () => {

    const [cookie, setCookie] = useState({
        band_id: null,
        description: null
      });

      const [description, setDescription] = useState<string>("");

      useEffect(() => {
        const cookies = new Cookies();
    
        const band_id = cookies.get("band_id");
        const description = cookies.get("description");
        
        setCookie({
          band_id,
          description
        });
      }, []);

      useEffect(() => {
        if (cookie.description) {
          setDescription(cookie.description);
        }
      }, [cookie.description]);
    
      const handleUpdateDescription = (newDescription: string) => {
        setDescription(newDescription);
      };
    
      console.log(cookie.description)
      console.log(description);
  return (
    <> 
      <p>{description}</p>
      <BandDescriptionForm
        idBand={cookie.band_id}
        initialDescriptionBand={cookie.description}
        onUpdateDescription={handleUpdateDescription}
      />
    </>
  );
};

export default DescriptionProfile