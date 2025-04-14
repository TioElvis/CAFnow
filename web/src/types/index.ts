export interface ErrorPage {
  reset: () => void;
  error: Error & { digest?: string };
}
