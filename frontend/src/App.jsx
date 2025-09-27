import { Layout } from "./layouts/Layout";
import { HomePage } from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import "./index.css";
import { MessageProvider } from "./providers/MessageProvider";

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
          </Route>
        </Routes>
      </MessageProvider>
    </div>
  );
}

export default App;
