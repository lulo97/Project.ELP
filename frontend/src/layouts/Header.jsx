import { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { routes } from "../routes";
import { getConsts } from "../utils/const";
import { getUserByToken } from "../services/auth";
import { Button } from "../components/Button";
import Dropdown from "../components/Dropdown";
import { OutlinedButton } from "../components/OutlinedButton";
import { translation } from "./Header.Translation";
import { getTranslation } from "../utils/getTranslation";

export function Header({ language, handleChangeLanguage }) {
  const [userName, setUsername] = useState("");

  async function fetchData() {
    const user = await getUserByToken();
    if (!user || !user.username) return;
    setUsername(user.username);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const avatarMenu = [
    {
      key: "1",
      content: "Log out",
      onClick: () => {
        localStorage.removeItem("token");
        window.location.href = "/";
      },
    },
  ];

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-indigo-600 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        {getConsts().APPLICATION_NAME}
      </div>

      {/* Nav */}
      <nav className="flex space-x-6 relative">
        {routes.map((ele, index) => {
          if (ele.isNotDisplayOnHeader) return null;

          // Dropdown menu
          if (ele.children) {
            const menu = ele.children.map((item) => ({
              key: item.name,
              content: item.name,
              onClick: () => {
                window.location.href = item.path;
              },
            }));

            return (
              <Dropdown menu={menu} align="left">
                <button className="flex items-center text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  {getTranslation(ele.name, translation)}
                </button>
              </Dropdown>
            );
          }

          // Normal nav item
          return (
            <a
              key={index}
              href={ele.path}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              {ele.name}
            </a>
          );
        })}
      </nav>

      {/* Avatar */}
      {userName && (
        <Dropdown menu={avatarMenu} align="left">
          <Avatar name={userName} />
        </Dropdown>
      )}

      <div className="flex gap-4 items-center">
        {/* Buttons */}
        {!userName && (
          <div>
            <Button
              className="mr-2"
              text={getTranslation("Login", translation)}
              onClick={() => {
                window.location.href = "/login";
              }}
            />
            <OutlinedButton
              text={getTranslation("SignUp", translation)}
              onClick={() => {
                window.location.href = "/signup";
              }}
            />
          </div>
        )}

        {/* Language */}
        <div>
          {language == "vi" && (
            <button onClick={() => handleChangeLanguage("en")}>
              <span class="fi fi-vn text-2xl"></span>
            </button>
          )}
          {language == "en" && (
            <button onClick={() => handleChangeLanguage("vi")}>
              <span class="fi fi-gb text-2xl"></span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
