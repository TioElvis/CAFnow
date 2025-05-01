"use server";
import { decodeJwt } from "jose";
import type { Token } from "@/types/jwt";
import type { User } from "@/types/user";
import { _axios } from "@/providers/axios/ssr";
import { HandleError } from "@/lib/handle-error";
import { getAccessToken } from "@/app/(root)/private/actions";

export async function myProfile() {
  try {
    const access_token = await getAccessToken();
    const { user_id }: Token = decodeJwt(access_token!);

    const user = await findUserById(user_id);

    return user;
  } catch (error) {
    throw HandleError(error);
  }
}

export async function findUserById(id: string) {
  try {
    const access_token = await getAccessToken();

    const response = await _axios.get(`/user/find-by-id/${id}`, {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    });

    return response.data as User;
  } catch (error) {
    throw HandleError(error);
  }
}
