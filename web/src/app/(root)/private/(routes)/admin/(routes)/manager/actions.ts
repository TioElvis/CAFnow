"use server";

import { getAccessToken } from "@/app/(root)/private/actions";
import { HandleError } from "@/lib/handle-error";
import { _axios } from "@/providers/axios/ssr";
import { User, UserRole } from "@/types/user";

export async function findAllSuperManagers() {
  try {
    const access_token = await getAccessToken();

    const response = await _axios.get("/manager/find-all", {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    });

    return (response.data as Array<User>).filter(
      (e) => e.role === UserRole.SUPER_MANAGER,
    );
  } catch (error) {
    throw HandleError(error);
  }
}
