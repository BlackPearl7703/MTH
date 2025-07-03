import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Mehfil Music. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="/" className="hover:text-white text-sm">
            Home
          </a>

          <a href="/favorites" className="hover:text-white text-sm">
            Favorites
          </a>
          <a href="#" className="hover:text-white text-sm">
            About
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
