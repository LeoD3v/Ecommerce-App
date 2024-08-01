import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React from "react";
import { useForm } from "react-hook-form";
import { UserSchemaLogin, userSchema } from "../schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../store/useStore";
export const Route = createFileRoute("/login")({
  component: LoginPage,
});

export default function LoginPage() {
  const { role, setRole } = useStore((state) => ({
    role: state.role,
    setRole: state.setRole,
  }));

  const navigate = useNavigate({ from: "/login" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaLogin>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    if (
      name === "Leandro" &&
      email === "lalo@lalo.com" &&
      password === "lalo"
    ) {
      navigate({ to: "/dashboard" });
      setRole(true);

      console.log("data", data);
      console.log(role);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
            placeholder="Name"
            id="name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
            placeholder="Email"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
            placeholder="Password"
            type="password"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>
        <button
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
