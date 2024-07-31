import { Link } from "@tanstack/react-router";
import React from "react";

export default function Navigation(){
    return ( 
     <div>
        <nav className="px-20 bg-gray-800 text-white p-4 content-space">
            <Link to={"/"} className="text-xl px-4 py-2 hover:bg-gray-700 rounded">Home</Link>
            <Link to={"/login"} className="text-xl px-4 py-2 hover:bg-gray-700 rounded">login</Link>
            <Link to={"/logout"} className="text-xl px-4 py-2 hover:bg-gray-700 rounded">logout</Link>
            <Link to={"/signup"} className="text-xl px-4 py-2 hover:bg-gray-700 rounded">signup</Link>
        </nav>
    </div>
    )
}