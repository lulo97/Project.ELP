import { Layout } from "./layouts/Layout";
import { HomePage } from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import "./index.css";
import { MessageProvider } from "./providers/MessageProvider";

function App() {
  return (
    <div>
      <MessageProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {routes.map((r, index) => (
              <Route key={index} path={r.path} element={r.element} />
            ))}
          </Route>
        </Routes>
      </MessageProvider>
    </div>
  );
}

export default App;
