import {
  ALLOW_ORIGIN_HEADER_NAME,
  ALLOWED_ORIGINS,
  ALLOW_METHODS_HEADER_NAME,
  ALLOWED_METHODS,
  ALLOW_HEADERS_HEADER_NAME,
  ALLOWED_HEADERS,
} from "../_constants/headers";

export function getCorsHeaders() {
  const headers = new Headers();
  headers.set(ALLOW_ORIGIN_HEADER_NAME, ALLOWED_ORIGINS);
  headers.set(ALLOW_METHODS_HEADER_NAME, ALLOWED_METHODS);
  headers.set(ALLOW_HEADERS_HEADER_NAME, ALLOWED_HEADERS);
  return headers;
}
