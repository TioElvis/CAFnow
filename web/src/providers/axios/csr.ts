import axios from "axios";

export const _axios = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

_axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const status = error.response?.status;

    if (status === 401 && !request._retry) {
      request._retry = true;

      if (isRefreshing === false) {
        isRefreshing = true;

        try {
          await _axios.get("/auth/refresh-access-token");

          return _axios(request);
        } catch (error) {
          window.location.href = "/auth/sign-in";
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  },
);
