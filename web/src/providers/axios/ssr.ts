import axios from "axios";

export const _axios = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
