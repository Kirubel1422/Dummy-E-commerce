import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "../constants/api";

// Make shop api slice
export const shopApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT }),
  tagTypes: ["Product", "Category", "Cart", "User"],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
    }),

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
      providesTags: (result, error, args) => [
        {
          type: "Product",
          id: args.id,
        },
      ],
    }),
    // Create new product
    createProduct: builder.mutation({
      query: (body) => ({
        url: `/products`,
        body,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // Fetch all users
    getUsers: builder.query({
      query: () => ({ url: "/users" }),
      providesTags: (result, error, args) => [
        { type: "User", id: "LIST" },
        ...result.map((user) => ({ type: "User", id: user.id })),
      ],
    }),

    // Fetch single user
    getUser: builder.query({
      query: ({ id }) => ({ url: `/users/${id}` }),
      providesTags: (result, error, args) => [{ type: "User", id: args.id }],
    }),

    // delete user
    deleteUser: builder.mutation({
      query: ({ id }) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateProductMutation,
  useLoginMutation,
} = shopApi;
