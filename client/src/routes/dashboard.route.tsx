import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import useStore from "../store/useStore";
import ItemsTable from "../components/itemsTable";

// export default function LoginPage() {
//   const { role, setRole } = useStore((state) => ({
//     role: state.role,
//     setRole: state.setRole,
//   }));
// }

export const Route = createFileRoute("/dashboard")({
  component: () => <ItemsTable />,
});
