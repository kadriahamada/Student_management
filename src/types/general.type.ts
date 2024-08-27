export type DBResponse = { success: boolean; insertId?: number };
export type Constructor<T> = new (...args: unknown[]) => T;
