import { SYSTEM_MESSAGES } from '../constants';
import { CorsOptions } from 'cors';

const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(',') || [];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allowed?: boolean) => void
  ): void => {
    if (origin && !allowedOrigins.includes(origin)) {
      return callback(new Error(SYSTEM_MESSAGES.CORS_NOT_ALLOWED));
    }
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions;
