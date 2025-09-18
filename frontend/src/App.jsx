import { Layout } from "./layouts/Layout";
import { HelloWorld } from "./pages/HelloWorld";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import './index.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HelloWorld />} />
          {routes.map((r, index) => (
            <Route key={index} path={r.path} element={r.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
