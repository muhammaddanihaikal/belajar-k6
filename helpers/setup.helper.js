import { login } from "../services/auth.service.js";

// Helper persiapan global (Login 1x untuk ambil token)
export function authSetup() {
  const res = login("emilys", "emilyspass");
  return {
    token: res.json("accessToken"),
    userId: res.json("id"),
  };
}
