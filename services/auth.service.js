import http from "k6/http";
import { BASE_URL } from "../config/config.js";

// Fungsi Login Reusable
export function login(username, password) {
  const url = `${BASE_URL}/auth/login`;
  const payload = JSON.stringify({ username, password });
  const params = {
    headers: { "Content-Type": "application/json" },
  };

  return http.post(url, payload, params);
}
