import Image from "next/image";
import NavBar from "@/components/NavBar";
import BandsHome from "@/components/Home";
import NavRoot from "@/components/NavRoot";

export default function Home() {
  return (
    <body>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <NavBar />
        <NavRoot />
        <BandsHome />
      </main>
    </body>
  );
}
