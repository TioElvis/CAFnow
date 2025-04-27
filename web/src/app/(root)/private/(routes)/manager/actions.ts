"use server";
import { HandleError } from "@/lib/utils";
import { User, UserRole } from "@/types/user";
import { getAccessToken } from "@/app/actions";
import { _axios } from "@/providers/axios/ssr";

export async function findAllManagers(
  role: UserRole.SUPER_MANAGER | UserRole.MANAGER | "all" = "all",
) {
  try {
    const access_token = await getAccessToken();

    const response = await _axios.get(`/manager/find-all?role=${role}`, {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    });

    return response.data as Array<User>;
  } catch (error) {
    throw HandleError(error);
  }
}
