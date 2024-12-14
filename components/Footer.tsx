"use client";
import { Grenze_Gotisch } from "@next/font/google";
import { FaInstagram, FaFacebookF, FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Logo from "./Logo";

const grenzeGot = Grenze_Gotisch({
  subsets: ["latin"],
  weight: ["500"],
});

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <div className="w-3/5 h-px bg-white mt-2 mx-auto"></div>

      <h6
        className={`flex justify-center ${grenzeGot.className} text-2xl pt-2 mb-5 text-gray-300`}
      >
        METAL CRYPT
      </h6>
      <div>
        <div className="flex justify-center mb-3">
          <Link
            href="https://www.instagram.com/metal_crypt666"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-300"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61570576227451"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-300"
          >
            <FaFacebookF size={24} />
          </Link>
          <Link
            href="https://x.com/MetalCrypt666?t=0qMLnRDzLz_mo4Ax6deixA&s=08"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-300"
          >
            <FaSquareXTwitter size={24} />
          </Link>
        </div>
      </div>
      <div className="flex justify-evenly text-gray-300">
        <Link href={"/pv"}>Privacy</Link>
        <Link href={"/about"}>Contact us</Link>
        <Link href={"/tac"}>Terms</Link>
      </div>
      <div className="flex justify-center mt-2 mb-1">
        <p className="text-gray-300">© {currentYear} All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
