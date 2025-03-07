export const enhanceError = (
  error: unknown,
  code: string
): Error & { additionalCode: string } => {
  const err = error instanceof Error ? error : new Error(String(error));
  (err as Error & { additionalCode: string }).additionalCode = code;
  return err as Error & { additionalCode: string };
};

export default enhanceError;
