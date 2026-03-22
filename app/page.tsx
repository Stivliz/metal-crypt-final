import Image from "next/image";
import NavBar from "@/components/NavBar";
import BandsHome from "@/components/Home";
import NavRoot from "@/components/NavRoot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen flex flex-col justify-center w-full">
      <NavBar />
      <NavRoot />
      <BandsHome />
      <Footer />
    </main>
  );
}

// <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
