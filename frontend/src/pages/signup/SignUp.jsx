import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PopupField } from "../../components/PopupField";
import { message } from "../../providers/MessageProvider";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (password !== confirm) {
      message({ text: "Passwords do not match", type: "error"});
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error || "Sign up failed");
      }

      message({ text: "Account created successfully!"});
      setUsername("");
      setPassword("");
      setConfirm("");
    } catch (err) {
      message({ text: err.message, type: "error"});
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
      <PopupField
        label="Confirm Password"
        fieldComponent={
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        }
      />
      <Button
        text={loading ? "Signing up..." : "Sign Up"}
        onClick={handleSignUp}
        disabled={loading}
      />
    </div>
  );
}
