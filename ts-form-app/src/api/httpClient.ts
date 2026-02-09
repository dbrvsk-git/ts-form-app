import type { ApiResponse } from "../types/api";

//genericka HTTP funkce
export async function post<T>(
  url: string,
  data: unknown,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    return {
      data: json,
    };
  } catch (e) {
    return {
      error: "Network error",
    };
  }
}
