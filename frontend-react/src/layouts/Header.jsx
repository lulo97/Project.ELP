import { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { routes } from "../routes";
import { getConsts } from "../utils/const";
import { getUserByToken, logout, me } from "../services/auth";
import { Button } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { OutlinedButton } from "../components/OutlinedButton";
import { translation } from "./Header.Translation";
import { getTranslation } from "../utils/getTranslation";
import { message } from "../providers/MessageProvider";
import { useDeviceType } from "../hooks/useDeviceType";
import { HeaderMobile } from "./Header.Mobile";

export function Header({ language, handleChangeLanguage }) {
  const [userName, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const device = useDeviceType();

  async function fetchData() {
    const show_error = [
      "/login",
      "/signup",
      "/",
      "/exercise",
      "/mcq_generator",
      "/youtube_listening",
      "/question_generator",
    ].includes(window.location.pathname);
    const user = await getUserByToken(!show_error);
    if (!user || !user.username) return;
    setUsername(user.username);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleLogout() {
    const result_logout = await logout();

    if (result_logout.error) {
      message({ type: "error", text: result_logout.error })
      return;
    }

    const result_me = await me();

    if (result_me.data) {
      message({
        type: "error",
        text: "Logout may have failed, /me still returns a user",
      });
      return;
    } else {
      message({ text: "Logout verified successfully" });
    }

    window.location.href = "/";
  }

  const avatarMenu = [
    {
      key: "1",
      content: "Log out",
      onClick: async () => {
        await handleLogout();
      },
    },
  ];

  if (device == "mobile") {
    return (
      <HeaderMobile
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        routes={routes}
        userName={userName}
        avatarMenu={avatarMenu}
        translation={translation}
        language={language}
        handleChangeLanguage={handleChangeLanguage}
      />
    );
  }

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50 h-[10vh]">
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

          if (ele.isAuth && !userName) return null;

          if (ele.isAdmin && userName.toLowerCase() != "admin") return null;

          // Dropdown menu
          if (ele.children) {
            const menu = ele.children.map((item) => ({
              key: item.name,
              content: getTranslation(item.name, translation),
              onClick: () => {
                window.location.href = item.path;
              },
              href: item.path,
              as: "a",
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

      <div className="flex gap-4 items-center">
        {/* Avatar */}
        {userName && (
          <Dropdown menu={avatarMenu} align="left">
            <Avatar name={userName} />
          </Dropdown>
        )}

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
