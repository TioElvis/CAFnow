"use server";
import { HandleError } from "@/lib/utils";
import { getAccessToken } from "@/app/actions";
import { _axios } from "@/providers/axios/ssr";

export async function getAllCAFs() {
  try {
    const access_token = await getAccessToken();

    const response = await _axios.get("/CAF/find-all", {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    HandleError(error);
  }
}
