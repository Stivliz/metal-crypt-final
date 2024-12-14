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

    setTimeout(() => {
      window.location.reload();
    }, 800);

    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="flex flex-col justify-center items-center w-full bg-black">
      <section>
        <Logo />
      </section>
      <section>
        <ul className="flex justify-around w-40">
          {isLoggedIn ? (
            <>
              <li>
                <button onClick={handleLogout} className="font-thin">
                  Logout
                </button>
              </li>
              <div className="font-thin">/</div>
              <li>
                <Link href="/profile">
                  <p className="font-thin">Profile</p>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <p className="font-thin">Login</p>
                </Link>
              </li>
              <div className="font-thin">/</div>
              <li>
                <Link href="/register">
                  <p className="font-thin">Register</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </section>
    </nav>
  );
};
export default NavBar;
