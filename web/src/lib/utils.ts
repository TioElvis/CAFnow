import { isAxiosError } from "axios";
import type { AxiosError } from "axios";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class ClientError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AppError";
    this.status = status;

    Object.setPrototypeOf(this, ClientError.prototype);
  }
}

export function HandleError(error: unknown | AxiosError) {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;
    const status = error.response?.status ?? 500;

    if (status === 401 || status === 403) {
      return new ClientError(
        "Non hai i permessi per accedere a questa risorsa",
        status,
      );
    }

    if (message !== undefined) {
      const parsedMessage = Array.isArray(message?.message)
        ? message.message[0]
        : message.message ?? message;

      return new ClientError(parsedMessage, status);
    }

    return new ClientError("Errore del server", status);
  }

  if (error instanceof Error) {
    return new ClientError(error.message, 500);
  }

  return new ClientError("Errore sconosciuto", 500);
}
