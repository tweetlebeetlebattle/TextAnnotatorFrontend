import axios from "axios";
import type { Method } from "axios";

const BASE_URL = process.env.REACT_APP_NATURAL_LANG_API_HOST as string;

export const post = async (
  path: string,
  body: Record<string, any>,
  authorization?: string
) => {
  return performRequest("POST", path, body, "application/json", authorization);
};

export const postFormData = async (
  path: string,
  body: FormData,
  authorization?: string
) => {
  return performRequest("POST", path, body, undefined, authorization);
};

export const fetch = async (path: string, authorization?: string) => {
  return performRequest("GET", path, undefined, undefined, authorization);
};

const performRequest = async (
  method: Method,
  path: string,
  body?: Record<string, any> | FormData,
  contentType?: string,
  authorization?: string
): Promise<any> => {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (contentType && !(body instanceof FormData)) {
    headers["Content-Type"] = contentType;
  }

  if (authorization) {
    headers["Authorization"] = `Bearer ${authorization}`;
  }

  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${path}`,
      data: body,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
