import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
