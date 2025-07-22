import type { User } from "../types/User";

export const getFromCache = (key: string): User | null => {
  const data = localStorage.getItem(`user_${key}`);
  return data ? (JSON.parse(data) as User) : null;
};

export const saveToCache = (key: string, data: User): void => {
  localStorage.setItem(`user_${key}`, JSON.stringify(data));
};
