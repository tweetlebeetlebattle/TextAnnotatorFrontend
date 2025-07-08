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

interface ServerExceptionProps {
  status: number;
  message: string;
  title?: string;
}

class ServerException extends Error {
  public status: number;
  public title?: string;

  constructor({ status, message, title }: ServerExceptionProps) {
    super(message);
    this.status = status;
    this.name = "ServerException";
    this.title = title;
  }
}

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
    console.log(
      `Performing ${method} request to ${BASE_URL}${path} authorisation${authorization}`,
      {
        body,
      }
    );
    const response = await axios({
      method,
      url: `${BASE_URL}${path}`,
      data: body,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("An unexpected error occurred", error);
    throw new Error("An unexpected error occurred");
  }
};
