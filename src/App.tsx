import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReaderPage } from "./pages/ReaderPage/ReaderPage";
import { Footer } from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReaderPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
