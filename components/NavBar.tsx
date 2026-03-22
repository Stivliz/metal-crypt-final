"use client";
import Logo from "./Logo";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();
  const router = useRouter();

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [cookies]);

  const handleLogout = () => {
    cookies.remove("band_id");
    cookies.remove("bandname");
    cookies.remove("formedDate");
    cookies.remove("genre");
    cookies.remove("logoBand");
    cookies.remove("token");
    cookies.remove("description")

    // setTimeout(() => {
    //   window.location.reload();
    // }, 800);

    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-red-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer transform hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <Logo />
          </div>
          <div className="flex">
            <ul className="flex items-center space-x-8">
              {isLoggedIn ? (
                <>
                  <li>
                    <Link href="/profile" className="text-gray-300 hover:text-white uppercase tracking-widest text-sm font-black transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] relative group">
                      Profile
                      <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-400 uppercase tracking-widest text-sm font-black transition-all hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] relative group">
                      Logout
                      <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="text-gray-300 hover:text-white uppercase tracking-widest text-sm font-black transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] relative group">
                      Login
                      <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="px-5 py-2 bg-red-900/40 border border-red-600/50 hover:bg-red-800/60 hover:border-red-400 text-white uppercase tracking-widest text-sm font-black transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] rounded-sm">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* Aggressive Red Accent Edge */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
    </nav>
  );
};

export default NavBar;
