export * from 'react-auth-kit';

declare module 'react-auth-kit' {
  export function useAuthUser(): () => User | null;
}
