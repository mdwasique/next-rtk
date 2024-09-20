import { createApi } from "@reduxjs/toolkit/query/react"; // always import from this exact folder "@reduxjs/toolkit/query/react""
const USER_URL = "/api/users";
import { baseQuery } from "./intialApiSetup";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
