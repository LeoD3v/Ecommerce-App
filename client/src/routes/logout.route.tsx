import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/logout")({
  component: () => <div>Hello /logout!</div>,
});
