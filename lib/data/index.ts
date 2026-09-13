import { localDataSource } from './local';

export type { DataSource } from './types';

/**
 * The one line to change when a backend arrives: point this at an HTTP
 * implementation and nothing under app/ or components/ needs to know.
 */
export const data = localDataSource;
