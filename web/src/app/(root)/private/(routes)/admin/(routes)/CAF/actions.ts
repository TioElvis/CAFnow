"use server";
import { _axios } from "@/providers/axios/ssr";
import { HandleError } from "@/lib/handle-error";
import { getAccessToken } from "@/app/(root)/private/actions";

export async function findAllCAFs() {
  try {
    const access_token = await getAccessToken();

    const response = await _axios.get("/CAF/find-all", {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw HandleError(error);
  }
}
