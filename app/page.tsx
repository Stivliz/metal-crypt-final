import Image from "next/image";
import NavBar from "@/components/NavBar";
import BandsHome from "@/components/Home";
import NavRoot from "@/components/NavRoot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <body className="bg-black h-[100%] flex flex-col justify-center w-auto">
      <NavBar />
      <NavRoot />
      <BandsHome />
      <Footer />
    </body>
  );
}

// <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
