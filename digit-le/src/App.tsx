import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Error404, GameBoard, Home } from "./views";
import "./App.scss";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/digit" replace />} />
        <Route path="/digit">
          <Route index element={<Home />} />
          <Route path="board">
            <Route index element={<Navigate to="guest" replace />} />
            <Route path=":name" element={<GameBoard />} />
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
