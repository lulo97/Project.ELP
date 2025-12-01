import { getConsts } from "../utils/const";
import { getTranslation } from "../utils/getTranslation";
import { Dropdown } from "../components/Dropdown";
import { Button } from "../components/Button";
import { OutlinedButton } from "../components/OutlinedButton";
import { Avatar } from "../components/Avatar";

export function HeaderMobile({
  menuOpen,
  setMenuOpen,
  routes,
  userName,
  avatarMenu,
  translation,
  language,
  handleChangeLanguage,
}) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50 h-[10vh]">
      {/* Logo */}
      <div
        className="text-xl font-bold text-indigo-600 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        {getConsts().APPLICATION_NAME}
      </div>

      {/* ------- Mobile Hamburger ------- */}
      <div className="flex gap-2 justify-center items-center">
        {/* Avatar */}
        {userName && (
          <div className="">
            <Dropdown menu={avatarMenu} align="left">
              <Avatar name={userName} size={"small"} />
            </Dropdown>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center w-8 h-8 text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* ------- Mobile Dropdown Menu ------- */}
      {menuOpen && (
        <div className="absolute left-0 top-full w-full flex flex-col bg-white shadow-lg p-4 z-40">
          {/* Nav Items */}
          {routes.map((ele, index) => {
            if (ele.isNotDisplayOnHeader) return null;
            if (ele.isAuth && !userName) return null;
            if (ele.isAdmin && userName?.toLowerCase() !== "admin") return null;

            if (ele.children) {
              return (
                <details key={index} className="mb-2">
                  <summary className="cursor-pointer py-2 text-gray-700 font-medium">
                    {getTranslation(ele.name, translation)}
                  </summary>
                  <div className="pl-4 flex flex-col">
                    {ele.children.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => (window.location.href = c.path)}
                        className="py-2 text-gray-600 text-left"
                      >
                        {getTranslation(c.name, translation)}
                      </button>
                    ))}
                  </div>
                </details>
              );
            }

            return (
              <a
                key={index}
                href={ele.path}
                className="py-2 text-gray-700 font-medium"
              >
                {ele.name}
              </a>
            );
          })}

          {/* Auth buttons */}
          {!userName && (
            <div className="mt-4 flex flex-col gap-2">
              <Button
                className="w-full"
                text={getTranslation("Login", translation)}
                onClick={() => (window.location.href = "/login")}
              />
              <OutlinedButton
                className="w-full"
                text={getTranslation("SignUp", translation)}
                onClick={() => (window.location.href = "/signup")}
              />
            </div>
          )}

          {/* Language */}
          <div className="pt-1 ">
            {language === "vi" && (
              <button onClick={() => handleChangeLanguage("en")}>
                <span className="fi fi-vn text-2xl"></span>
              </button>
            )}
            {language === "en" && (
              <button onClick={() => handleChangeLanguage("vi")}>
                <span className="fi fi-gb text-2xl"></span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
