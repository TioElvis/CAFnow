import { isAxiosError, AxiosError } from "axios";

export class _HandleError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "_HandleError";
    this.status = status;

    Object.setPrototypeOf(this, _HandleError.prototype);
  }
}

export function HandleError(error: unknown | AxiosError) {
  if (isAxiosError(error) === true) {
    const status = error.response?.status ?? 500;
    const message = error.response?.data?.message;

    if (status === 401 || status === 403) {
      return new _HandleError("Accesso negato", status);
    }

    if (message !== undefined) {
      const parsed_message =
        Array.isArray(message?.message) === true
          ? message.message[0]
          : message.message ?? message;

      return new _HandleError(parsed_message, status);
    }

    return new _HandleError("Errore del server", status);
  }

  if (error instanceof Error) {
    return new _HandleError(error.message, 500);
  }

  return new _HandleError("Errore sconosciuto", 500);
}
