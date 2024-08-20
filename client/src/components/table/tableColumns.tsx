import { paginationFilter } from "../../store/useStore";
import { PaginationType } from "../../types";

export const columns = [
  {
    accessorKey: "rowNumber",
    header: () => "#",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: "type",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "model",
    header: "Model",
  },

  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Qt",
  },
  {
    accessorKey: "createdAt",
    header: () => "Date Created",
    cell: (info) => {
      const data = new Date(info.getValue());
      return data.toLocaleDateString();
    },
  },
];
