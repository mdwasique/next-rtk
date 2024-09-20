import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

export const baseUrl = process.env.BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState; // Cast getState to RootState
    const token = state.auth.token; // Now getState knows auth exists and has the correct type
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
