"use server";
import { decodeJwt } from "jose";
import type { User } from "@/types/user";
import { handleError } from "@/lib/utils";
import { _axios } from "@/providers/axios/ssr";
import { getAccessToken } from "@/app/actions/get-access-token";

export async function myProfile() {
  try {
    const access_token = await getAccessToken();

    const jwt = decodeJwt(access_token!);

    const response = await _axios.get(`/user/find-by-id/${jwt.user_id}`, {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    });

    return response.data as User;
  } catch (error) {
    throw new Error(handleError(error));
  }
}
