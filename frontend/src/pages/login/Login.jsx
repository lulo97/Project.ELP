import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PopupField } from "../../components/PopupField";
import { message } from "../../providers/MessageProvider";

export function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      message({ text: "Please enter both username and password", type: "warning" });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error || "Login failed");
      }

      // Store token or user info if returned
      if (result.data?.token) {
        localStorage.setItem("token", result.data.token);
      } else {
        throw Error("Response doesn't have token!")
      }

      message({ text: "Login successful!" });
      setUsername("");
      setPassword("");

      window.location.href = "/";
    } catch (err) {
      message({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 space-y-3">
      <PopupField
        label="Username"
        fieldComponent={
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        }
      />
      <PopupField
        label="Password"
        fieldComponent={
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        }
      />
      <Button
        text={loading ? "Logging in..." : "Log In"}
        onClick={handleLogin}
        disabled={loading}
      />
    </div>
  );
}
