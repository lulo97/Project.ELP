import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PopupField } from "../../components/PopupField";
import { message } from "../../providers/MessageProvider";
import { translation } from "./Login.Translation";
import { getTranslation } from "../../utils/getTranslation";

export function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      message({
        text: getTranslation("PleaseEnterBothUsernameAndPassword", translation),
        type: "warning",
      });
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
        throw new Error(result.error);
      }

      // Store token or user info if returned
      if (result.data?.token) {
        localStorage.setItem("token", result.data.token);
      } else {
        throw Error(getTranslation("ResponseDoesntHaveToken", translation));
      }

      message({
        text: getTranslation("LoginSuccessful", translation),
      });

      setUsername("");
      setPassword("");

      const previousLocations = JSON.parse(
        localStorage.getItem("locations") || "[]"
      );

      if (previousLocations.length >= 2) {
        window.location.href = previousLocations[previousLocations.length - 2].path;
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      message({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center mt-24 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl p-8 space-y-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {getTranslation("WelcomeBack", translation)}
        </h2>

        <div className="space-y-4">
          <PopupField
            label={getTranslation("Username", translation)}
            fieldComponent={
              <Input
                placeholder={getTranslation("Username", translation)}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            }
          />
          <PopupField
            label={getTranslation("Password", translation)}
            fieldComponent={
              <Input
                type="password"
                placeholder={getTranslation("Password", translation)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            }
          />
        </div>

        <div className="pt-4">
          <Button
            text={
              loading
                ? getTranslation("LoggingIn", translation)
                : getTranslation("LogIn", translation)
            }
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-white"
          />
        </div>

        <p className="text-center text-sm text-gray-500">
          {getTranslation("DontHaveAnAccount", translation)}{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            {getTranslation("SignUp", translation)}
          </a>
        </p>
      </div>
    </div>
  );
}
