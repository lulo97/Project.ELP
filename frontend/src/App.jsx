import { Layout } from "./layouts/Layout";
import { HomePage } from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import "./index.css";
import { MessageProvider } from "./providers/MessageProvider";
import { Link } from "react-router-dom";

function flattenRoutes(routes) {
  const result = [];
  routes.forEach((r) => {
    if (r.children) {
      result.push(...flattenRoutes(r.children));
    } else {
      result.push(r);
    }
  });
  return result;
}

export function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-lg w-full">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          Sorry, the page you’re looking for doesn’t exist. Try one of these available routes:
        </p>

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {flattenRoutes(routes).map((r, index) => (
            <a
              key={index}
              href={r.path}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {r.path}
            </a>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <MessageProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {flattenRoutes(routes).map((r, index) => (
              <Route key={index} path={r.path} element={r.element} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </MessageProvider>
    </div>
  );
}

export default App;
