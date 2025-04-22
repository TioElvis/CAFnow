"use server";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { handleError } from "@/lib/utils";
import { _axios } from "@/providers/axios/ssr";

export async function getAccessToken() {
  try {
    let access_token = await getCookie("access_token", { cookies });
    const refresh_token = await getCookie("refresh_token", { cookies });

    if (access_token === undefined && refresh_token !== undefined) {
      const response = await _axios.get("/auth/temporary-access-token", {
        headers: {
          Cookie: `refresh_token=${refresh_token}`,
        },
      });

      access_token = response.data.access_token;
    }

    return access_token;
  } catch (error) {
    throw new Error(handleError(error));
  }
}
