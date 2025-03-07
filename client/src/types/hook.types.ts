export type ApiState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};
