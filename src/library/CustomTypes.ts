/**
 * Strict version of Omit
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;