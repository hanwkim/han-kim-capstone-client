import "./styles/main.scss";
import HomePage from "./pages/HomePage/HomePage";
import CharacterSelectPage from "./pages/CharacterSelectPage/CharacterSelectPage";
import VersusPage from "./pages/VersusPage/VersusPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
      <Routes>
			  <Route path="/" element={<HomePage />} />
        <Route path="/select" element={<CharacterSelectPage />} />
        <Route path="/versus" element={<VersusPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
		</BrowserRouter>
	);
}

export default App;
