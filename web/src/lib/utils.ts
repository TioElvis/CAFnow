import { isAxiosError } from "axios";
import type { AxiosError } from "axios";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(error: unknown | AxiosError) {
  if (isAxiosError(error) === true) {
    const message = error.response?.data?.message;

    if (error.status === 401 || error.status === 403) {
      return "Non hai i permessi per accedere a questa risorsa";
    }

    if (message !== undefined) {
      if (message.message !== undefined) {
        if (Array.isArray(message.message)) {
          return message.message[0];
        } else {
          return message.message;
        }
      }

      return message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Internal error";
}
