export interface ErrorPage {
  reset: () => void;
  error: Error & { digest?: string };
}

export type TUseState<T> = React.Dispatch<React.SetStateAction<T>>;
