export function get(url: string, config?: RequestInit) {
  return fetch(url, {
    ...config,
    method: 'GET',
  });
}

export async function json<T, U = unknown>(
  url: string,
  callback?: (elem: U) => T,
  config?: RequestInit
): Promise<T> {
  const res = await fetch(url, config);
  const data = await res.json();
  if (callback) {
    return callback(data as U);
  }
  return data as T;
}

export async function text(
  url: string,
  callback?: (text: string) => string,
  config?: RequestInit
): Promise<string> {
  const res = await fetch(url, config);
  const data = await res.text();
  if (callback) {
    return callback(data);
  }
  return data;
}
