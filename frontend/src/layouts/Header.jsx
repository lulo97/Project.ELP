import { routes } from "../routes";
import { CONST } from "../utils/const";

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
        {CONST.APPLICATION_NAME}
      </div>

      {/* Nav */}
      <nav className="flex space-x-6 relative">
        {routes.map((ele, index) => {
          if (ele.isNotDisplayOnHeader) return null;

          // Dropdown menu
          if (ele.children) {
            return (
              <div key={index} className="relative group">
                <button className="flex items-center text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  {ele.name}
                  <span className="ml-1">▼</span>
                </button>

                <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-lg py-2 w-40 z-50">
                  {ele.children.map((child, cIndex) => (
                    <a
                      key={cIndex}
                      href={child.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              </div>
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
    </header>
  );
}
