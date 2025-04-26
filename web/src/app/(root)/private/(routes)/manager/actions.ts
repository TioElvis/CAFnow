"use server";
import { HandleError } from "@/lib/utils";
import { getAccessToken } from "@/app/actions";
import { _axios } from "@/providers/axios/ssr";

export async function getAllSuperManagers() {
  try {
    const access_token = await getAccessToken();

    const response = await _axios.get("/manager/find-all-super-managers", {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw HandleError(error);
  }
}

export async function getAllManagers() {
  try {
    const access_token = await getAccessToken();

    const response = await _axios.get("/manager/find-all", {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw HandleError(error);
  }
}
