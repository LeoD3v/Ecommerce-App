import React, { ChangeEvent, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, FormProvider } from "react-hook-form";
import {
  createItemFormSchema,
  type AddItemformSchema,
} from "../schemas/addItemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { portalFormState } from "../store/useStore";
import { ApiResponse } from "../types";
import { ZodError } from "zod";

export default function CreateItemForm() {
  const [serialNumbers, setSerialNumbers] = useState<string[]>([]);

  // console.log("this is the s#", serialNumbers);

  const handleSerialNumbersChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbersArray = value.split(",").map((sn) => sn.trim());
    setSerialNumbers(numbersArray);
  };
  const methods = useForm<AddItemformSchema>({
    defaultValues: {
      type: "electronics",
    },
    resolver: zodResolver(createItemFormSchema),
  });
  async function createItems(data: AddItemformSchema): Promise<ApiResponse> {
    try {
      const response = await fetch(`http://localhost:5005/api/item/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error ! ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed to create item", error);
      throw error;
    }
  }

  const { setPortal } = portalFormState((state) => ({
    setPortal: state.setPortal,
  }));

  const submitForm = async (data: AddItemformSchema) => {
    try {
      console.log("Submitted data:", data);
      // const parsedData = createItemFormSchema.parse(data);

      createItems(data);
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        console.error("Validation error:", error.errors);
        // Optionally display user-friendly error messages
      } else {
        // Handle other errors (e.g., network errors)
        console.error("Submission error:", error);
      }
      console.error("Submission error:", error);
    }
    setPortal();
  };

  const onError = (errors) => {
    console.error("Form Errors:", errors);
  };

  return createPortal(
    <div className=" fixed inset-0 flex items-center justify-center min-h-screen bg-blue-500 bg-opacity-30 backdrop-blur-s m z-[999] portal-overlay">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(submitForm, onError)}
          className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm"
        >
          <div className="text-right -mt-5 text-blue-500" onClick={setPortal}>
            X
          </div>
          <h2 className="text-2xl font-semibold text-blue-500 mb-6 text-center">
            Create Item
          </h2>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Type
            </label>
            <input
              type="text"
              placeholder="type"
              {...methods.register("type")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {methods.formState.errors.type && (
              <span className="text-red-600">
                {methods.formState.errors.type.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...methods.register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />{" "}
            {methods.formState.errors.name && (
              <span className="text-red-600">
                {methods.formState.errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="createdBy"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Created by
            </label>
            <input
              type="text"
              placeholder="created by"
              {...methods.register("createdBy")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />{" "}
            {methods.formState.errors.createdBy && (
              <span className="text-red-600">
                {methods.formState.errors.createdBy.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Price
            </label>
            <input
              type="number"
              placeholder="price"
              {...methods.register("price", {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {methods.formState.errors.price && (
              <span className="text-red-600">
                {methods.formState.errors.price.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="model"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Model
            </label>
            <input
              type="text"
              placeholder="model"
              {...methods.register("model")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />{" "}
          </div>{" "}
          {methods.formState.errors.model && (
            <span className="text-red-600">
              {methods.formState.errors.model.message}
            </span>
          )}
          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Brand
            </label>
            <input
              type="text"
              placeholder="brand"
              {...methods.register("brand")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />{" "}
            {methods.formState.errors.brand && (
              <span className="text-red-600">
                {methods.formState.errors.brand.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              placeholder="quantity"
              {...methods.register("quantity", {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />{" "}
            {methods.formState.errors.quantity && (
              <span className="text-red-600">
                {methods.formState.errors.quantity.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="serialNumber"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Serial#
            </label>
            <input
              type="text"
              placeholder="Enter serial numbers separated by commas"
              {...methods.register("serialNumbers")}
              value={serialNumbers.join(", ")}
              onChange={handleSerialNumbersChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />{" "}
            {methods.formState.errors.serialNumbers && (
              <span className="text-red-600">
                {methods.formState.errors.serialNumbers.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Description
            </label>
            <input
              type="text"
              placeholder="description"
              {...methods.register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />{" "}
            {methods.formState.errors.description && (
              <span className="text-red-600">
                {methods.formState.errors.description.message}
              </span>
            )}
          </div>
          <div className="flex justify-center pt-5">
            <button
              type="submit"
              className="w-[100%] bg-blue-500 text-white font-bold py-2 px-4  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>,
    document.body
  );
}
function generateObjectId(): ObjectId {
  throw new Error("Function not implemented.");
}
