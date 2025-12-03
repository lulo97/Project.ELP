import { message } from "../providers/MessageProvider";

export async function getUserByToken(show_error = false) {
  const result = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result_json = await result.json();

  if (result_json.error) {
    if (show_error) {
      message({ type: "error", text: result_json.error });
    }
    return null;
  }

  return result_json.data.user;
}

export async function logout() {
  const res = await fetch("/api/auth/logOut", {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}

export async function me() {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}
