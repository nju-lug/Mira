import axios, { AxiosRequestConfig } from 'axios';

export async function get<T, U = unknown>(
  url: string,
  callback?: (elem: U) => T,
  config?: AxiosRequestConfig<unknown>,
): Promise<T> {
  const res = await axios.get(url, config);
  const data = res.data;
  if (callback) {
    return callback(data as U);
  }
  return data as T;
}
