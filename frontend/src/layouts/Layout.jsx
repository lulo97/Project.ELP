import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header.jsx";
import { useEffect, useState } from "react";

export function Layout() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "vi"
  );

  const location = useLocation();

  function handleChangeLanguage(language) {
    setLanguage(language);
    localStorage.setItem("language", language);
  }

  // Initialize language if not set
  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "vi");
      setLanguage("vi");
    }
  }, []);

  // Track locations with timestamp
  useEffect(() => {
    let previousLocations =
      JSON.parse(localStorage.getItem("locations") || "[]");

    const newLocation = {
      path: location.pathname + location.search,
      timestamp: new Date().toISOString(),
    };

    if (previousLocations.length >= 10) {
      previousLocations = []
    }

    // Append new location
    previousLocations.push(newLocation);

    localStorage.setItem("locations", JSON.stringify(previousLocations));
  }, [location]);

  return (
    <div>
      <Header language={language} handleChangeLanguage={handleChangeLanguage} />
      <main key={language}>
        <Outlet />
      </main>
    </div>
  );
}
