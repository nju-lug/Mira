export async function get(url: string, config?: RequestInit) {
  const res = await fetch(url, {
    ...config,
    method: 'GET'
  });

  if (!res.ok) {
    return Promise.reject({
      status: res.status,
      message: `Request failed with status ${res.status}: ${res.statusText}`
    });
  }
  return res;
}

export async function json<T, U = unknown>(
  url: string,
  callback?: (elem: U) => T,
  config?: RequestInit
): Promise<T> {
  const res = await get(url, config);
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
  const res = await get(url, config);
  const data = await res.text();
  if (callback) {
    return callback(data);
  }
  return data;
}
