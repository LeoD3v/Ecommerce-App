import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import useStore from "../store/useStore";

export default function Navigation() {
  const { role, setRole } = useStore((state) => ({
    role: state.role,
    setRole: state.setRole,
  }));

  console.log(role);
  const navigate = useNavigate();
  function handleLogout() {
    setRole(false);
    navigate({ to: "/login" });
  }
  return (
    <div>
      <nav className="px-20 bg-white-800 text-blue p-4 content-space">
        <Link
          to={"/"}
          className="text-xl px-4 py-2 bg-white text-blue-600 hover:bg-blue-500 hover:text-white rounded transition duration-300 ease-in-out"
        >
          Home
        </Link>
        {!role.admin && (
          <Link
            to={"/login"}
            className="text-xl px-4 py-2 bg-white text-blue-600 hover:bg-blue-500 hover:text-white rounded transition duration-300 ease-in-out"
          >
            login
          </Link>
        )}

        {role.admin && (
          <button
            onClick={handleLogout}
            className="text-xl px-4 py-2 bg-white text-blue-600 hover:bg-blue-500 hover:text-white rounded transition duration-300 ease-in-out"
          >
            logout
          </button>
        )}

        {!role.admin && (
          <Link
            to={"/signup"}
            className="text-xl px-4 py-2 bg-white text-blue-600 hover:bg-blue-500 hover:text-white rounded transition duration-300 ease-in-out"
          >
            signup
          </Link>
        )}
        {role.admin && (
          <Link
            to={"/dashboard"}
            className="text-xl px-4 py-2 bg-white text-blue-600 hover:bg-blue-500 hover:text-white rounded transition duration-300 ease-in-out"
          >
            Dashboard
          </Link>
        )}
      </nav>
    </div>
  );
}
