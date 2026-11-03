import http from "k6/http";

const BASE_URL = "https://dummyjson.com";

// Fungsi Login Reusable (Pengganti Page Object Login di Playwright)
export function login(username, password) {
  const url = `${BASE_URL}/auth/login`;
  const payload = JSON.stringify({ username, password });
  const params = {
    headers: { "Content-Type": "application/json" },
  };

  return http.post(url, payload, params);
}
