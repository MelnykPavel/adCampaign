import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { ApiState } from '../types/hook.types';

const BASE_API_URL = import.meta.env.VITE_APP_BACKEND_SERVER;

const useApi = <T>(
  defaultEndpoint?: string,
  defaultOptions?: RequestInit
): ApiState<T> & {
  fetchData: (endpoint?: string, options?: RequestInit) => Promise<void>;
} => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (
      endpoint = defaultEndpoint,
      options = defaultOptions
    ): Promise<void> => {
      if (!endpoint) return;

      const url = endpoint.startsWith('http')
        ? endpoint
        : `${BASE_API_URL}${endpoint}`;
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!response.ok) {
          const errorMessage =
            result.errors?.[0]?.message || response.statusText;
          throw new Error(errorMessage);
        }

        setData(result.data);
        if (result?.message === 'Campaigns fetched successfully') return;
        toast.success(result?.message || 'Request successful!');
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Something went wrong';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [defaultEndpoint, JSON.stringify(defaultOptions)]
  );

  return { data, error, loading, fetchData };
};

export default useApi;
