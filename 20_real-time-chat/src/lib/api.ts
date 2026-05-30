type FetchOptions = RequestInit & {
  parseJson?: boolean;
};

export async function fetchJson<T>(input: RequestInfo | URL, init?: FetchOptions) {
  const res = await fetch(input, {
    credentials: "include",
    ...init,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const message =
      (errorBody && (errorBody.error || errorBody.message)) ||
      "Request failed";
    throw new Error(message);
  }

  if (init?.parseJson === false) {
    return null as T;
  }

  return (await res.json()) as T;
}
