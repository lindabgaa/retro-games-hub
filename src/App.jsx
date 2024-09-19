import { BrowserRouter, Route, Routes } from "react-router-dom";

import HangmanPage from "./pages/HangmanPage/HangmanPage";
import Home from "./pages/HomePage/HomePage";
import MastermindPage from "./pages/MastermindPage/MastermindPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import TicTacToePage from "./pages/TicTacToePage/TicTacToePage";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Hangman" element={<HangmanPage />} />
        <Route path="/Mastermind" element={<MastermindPage />} />
        <Route path="/TicTacToe" element={<TicTacToePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
