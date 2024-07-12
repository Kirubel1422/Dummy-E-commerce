import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "../constants/api";

// Make shop api slice
export const shopApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT }),
  tagTypes: ["Product", "Category", "Cart", "User"],
  endpoints: (builder) => ({
    // fetch multiple products
    getProducts: builder.query({
      query: () => ({ url: "products" }),
      providesTags: (result, error, args) =>
        result
          ? [
              { type: "Product", id: "LIST" },
              ...result.map((product) => ({ type: "Product", id: product.id })),
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    // Fetch single product
    getProduct: builder.query({
      query: ({ id }) => ({ url: `products/${id}` }),
      transformResponse: (resp, meta, arg) => resp,
      providesTags: (result, error, args) => ({ type: "Product", id: args.id }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = shopApi;
