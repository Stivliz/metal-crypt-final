import Link from "next/link";
import Search from "./Search";

const NavRoot = () => {
  return (
    <nav className="flex flex-col items-center bg-black pb-5 ">
      <section className="w-[40%] mt-[70px]">
        <ul className="flex justify-around">
          <li>
            <Link href="/">
              <p className="font-thin border-b-2 border-white">Home</p>
            </Link>
          </li>
          {
            <li>
              <Link href="/news">
                <p className="font-thin border-b-2 border-white">News</p>
              </Link>
            </li>
          }
          <li>
            <Link href="/about">
              <p className="font-thin border-b-2 border-white">About</p>
            </Link>
          </li>
        </ul>
      </section>
      <div className="w-3/5 h-px bg-white my-4 mx-auto"></div>
      <Search />
    </nav>
  );
};
export default NavRoot;
