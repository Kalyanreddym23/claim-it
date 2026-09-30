const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(
  /\/$/,
  "",
);

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { Accept: "application/json" };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  let response;
  try {
    response = await fetch(API_BASE_URL + path, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      "Unable to reach the server. Check that the API is running and VITE_API_BASE_URL is correct.",
      0,
    );
  }

  const responseText = await response.text();
  let data = {};

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }
  }

  if (!response.ok) {
    throw new ApiError(data.message || "The request could not be completed.", response.status);
  }

  return data;
}

function queryString(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      params.set(key, value);
    }
  });

  const query = params.toString();
  return query ? "?" + query : "";
}

export const api = {
  register: (credentials) => request("/auth/register", { method: "POST", body: credentials }),
  login: (credentials) => request("/auth/login", { method: "POST", body: credentials }),

  getItems: (filters) => request("/items" + queryString(filters)),
  getItem: (itemId) => request("/items/" + itemId),
  getMyItems: (token) => request("/items/mine", { token }),
  createItem: (item, token) => request("/items", { method: "POST", body: item, token }),
  updateItem: (itemId, item, token) =>
    request("/items/" + itemId, { method: "PUT", body: item, token }),
  deleteItem: (itemId, token) => request("/items/" + itemId, { method: "DELETE", token }),

  createClaim: (claim, token) => request("/claims", { method: "POST", body: claim, token }),
  getMyClaims: (token) => request("/claims/mine", { token }),
  getReceivedClaims: (token) => request("/claims/received", { token }),
  updateClaimStatus: (claimId, status, token) =>
    request("/claims/" + claimId, { method: "PATCH", body: { status }, token }),
};
