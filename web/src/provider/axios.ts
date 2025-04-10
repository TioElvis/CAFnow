import axios from "axios";
import { API_URL } from "@/lib/constants";

export const _axios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
