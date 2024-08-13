import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Error404, Game, Home } from "./views";
import "./App.scss";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route index element={<Home />} />
        <Route path="board">
          <Route index element={<Navigate to="/" replace />} />
          <Route path=":difficulty" element={<Game />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
