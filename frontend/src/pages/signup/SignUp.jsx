import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PopupField } from "../../components/PopupField";
import { message } from "../../providers/MessageProvider";
import { translation } from "./SignUp.Translation";
import { getTranslation } from "../../utils/getTranslation";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (password !== confirm) {
      message({ 
        text: getTranslation("PasswordsDoNotMatch", translation), 
        type: "error" 
      });
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
        throw new Error(result.error || getTranslation("SignUpFailed", translation));
      }

      message({ text: getTranslation("AccountCreatedSuccessfully", translation) });
      setUsername("");
      setPassword("");
      setConfirm("");
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
          {getTranslation("CreateYourAccount", translation)}
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
          <PopupField
            label={getTranslation("ConfirmPassword", translation)}
            fieldComponent={
              <Input
                type="password"
                placeholder={getTranslation("ConfirmPassword", translation)}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            }
          />
        </div>

        <div className="pt-4">
          <Button
            text={loading ? getTranslation("SigningUp", translation) : getTranslation("SignUp", translation)}
            onClick={handleSignUp}
            disabled={loading}
            className="w-full py-2 text-lg font-medium text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          />
        </div>

        <p className="text-center text-sm text-gray-500">
          {getTranslation("AlreadyHaveAnAccount", translation)}{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            {getTranslation("LogIn", translation)}
          </a>
        </p>
      </div>
    </div>
  );
}
