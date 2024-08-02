import React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navigation from "../components/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userSchema } from "../schemas/userSchema";
// import '../index.css'
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const queryClient = useQueryClient();

  async function fetchUser() {
    try {
      const response = await fetch("/api/user");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }
  const query = useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
  });
  if (query.isLoading) return <div>Loading...</div>;
  if (query.error) return <div>Error: {query.error.message}</div>;
  return (
    <>
      <div className="bg-blue">
        <Navigation />
      </div>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
}
