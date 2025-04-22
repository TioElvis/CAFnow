"use server";
import { handleError } from "@/lib/utils";
import { _axios } from "@/providers/axios/ssr";
import { getAccessToken } from "@/app/actions/get-access-token";

export async function getAllAdmins() {
  try {
    const access_token = await getAccessToken();

    const response = await _axios.get("admin/find-all", {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
}
