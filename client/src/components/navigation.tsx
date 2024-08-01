import { Link } from "@tanstack/react-router";
import React from "react";

export default function Navigation() {
  return (
    <div>
      <nav className="px-20 bg-white-800 text-blue p-4 content-space">
        <Link
          to={"/"}
          className="text-xl px-4 py-2 bg-white text-blue-600 hover:bg-blue-500 hover:text-white rounded transition duration-300 ease-in-out"
        >
          Home
        </Link>
        <Link
          to={"/login"}
          className="text-xl px-4 py-2 bg-white text-blue-600 hover:bg-blue-500 hover:text-white rounded transition duration-300 ease-in-out"
        >
          login
        </Link>
        <Link
          to={"/logout"}
          className="text-xl px-4 py-2 bg-white text-blue-600 hover:bg-blue-500 hover:text-white rounded transition duration-300 ease-in-out"
        >
          logout
        </Link>
        <Link
          to={"/signup"}
          className="text-xl px-4 py-2 bg-white text-blue-600 hover:bg-blue-500 hover:text-white rounded transition duration-300 ease-in-out"
        >
          signup
        </Link>
      </nav>
    </div>
  );
}
