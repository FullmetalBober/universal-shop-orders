import { AxiosError } from 'axios/core/AxiosError';

declare global {
  type ResponseError = AxiosError<{
    status: string;
    message: string;
    stack?: string;
  }>;
}
