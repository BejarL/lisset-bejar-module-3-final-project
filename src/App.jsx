import { Routes, Route } from "react-router-dom";
import AllGames from "./components/AllGames";
import Home from "./components/homepage/Home";
import Header from "./components/homepage/Header";
import Footer from "./components/homepage/Footer";
import AllTournaments from "./components/AllTournaments";
import LiveMatches from "./components/LiveMatches";
import TournamentDetails from "./components/TournamentDetails";
import GameDetails from "./components/GameDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="allGames" element={<AllGames />} />
        <Route path="allTournaments" element={<AllTournaments />} />
        <Route path="tournamentDetails" element={<TournamentDetails />} />
        <Route path="/games/:gameId" element={<GameDetails />} />
        <Route path="/live-matches/:gameId" element={<LiveMatches />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
