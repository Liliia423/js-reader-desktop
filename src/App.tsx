import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReaderPage } from "./pages/ReaderPage/ReaderPage";
import { Menu } from "../src/components/Menu/Menu";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReaderPage />} />
      </Routes>
      <Menu />
    </Router>
  );
}

export default App;
