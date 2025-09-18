import { routes } from "../routes";

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-indigo-600 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Application
      </div>

      {/* Nav */}
      <nav className="flex space-x-6">
        {routes.map((ele, index) => (
          <a
            key={index}
            href={ele.path}
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            {ele.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
