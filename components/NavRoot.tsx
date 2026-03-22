import Link from "next/link";
import Search from "./Search";

const NavRoot = () => {
  return (
    <div className="w-full bg-gradient-to-b from-black/80 to-transparent pt-10 pb-6 border-b border-white/5 relative overflow-hidden mb-8">
      {/* Background dark red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-red-900/10 blur-[80px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <ul className="flex items-center space-x-12 mb-10 mt-6">
          <li>
            <Link href="/" className="text-gray-400 hover:text-white text-lg tracking-[0.3em] font-black uppercase transition-all hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] relative group flex items-center gap-3">
              <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125 duration-300">⚔</span>
              Home
              <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125 duration-300">⚔</span>
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-400 hover:text-white text-lg tracking-[0.3em] font-black uppercase transition-all hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] relative group flex items-center gap-3">
              <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125 duration-300">⚔</span>
              About
              <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125 duration-300">⚔</span>
            </Link>
          </li>
        </ul>
        
        <div className="w-full max-w-2xl relative shadow-[0_0_30px_rgba(0,0,0,0.8)] rounded-full">
          {/* Fading edges on search for cinematic feel */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none rounded-l-full"></div>
          <Search />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none rounded-r-full"></div>
        </div>
      </div>
    </div>
  );
};
export default NavRoot;
