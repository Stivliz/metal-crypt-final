import { pvItem } from "../items";
import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import NavRoot from "@/components/NavRoot";
import Footer from "@/components/Footer";

interface Item {
  id: number;
  title: string;
  description: string;
}
const PoliticsPrivacy = () => {
  return (
    <div>
      <NavBar />
      <NavRoot />
      <div className="flex justify-center text-lg md:text-2xl mt-4 md:mt-9 mb-6 md:mb-12">
        <h2 className="text-gray-300">Privacy Policys</h2>
      </div>
      <div className="mb-9">
        {pvItem.map((item: Item) => (
          <div key={item.id} className="px-3 md:pl-32 pb-7">
            <h5 className="md:text-lg text-gray-300">
              {" "}
              {item.id}. {item.title}
            </h5>
            <p className="text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PoliticsPrivacy;
