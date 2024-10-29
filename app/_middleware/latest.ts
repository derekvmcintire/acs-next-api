import { NextRequest } from "next/server";
import { API_PATH, LATEST_PATH, LATEST_VERSION } from "../_constants/urls";

export function getRequestURL(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (path.startsWith(`${API_PATH}${LATEST_PATH}`)) {
    url.pathname = path.replace(
      `${API_PATH}${LATEST_PATH}`,
      `${API_PATH}/${LATEST_VERSION}`,
    );
  }

  return url;
}
