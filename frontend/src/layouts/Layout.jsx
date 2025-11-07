import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";
import { useEffect, useState } from "react";

export function Layout() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "vi"
  );

  function handleChangeLanguage(language) {
    setLanguage(language);
    localStorage.setItem("language", language);
  }

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "vi");
      setLanguage("vi");
    }
  });

  return (
    <div>
      <Header language={language} handleChangeLanguage={handleChangeLanguage} />
      <main key={language}>
        <Outlet />
      </main>
    </div>
  );
}
