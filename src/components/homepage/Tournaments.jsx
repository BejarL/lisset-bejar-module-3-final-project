import { usePandaApi } from "../../services/usePandaApi"; // Adjust the path according to your file structure
import TournamentCard from "../TournamentCard";
import { useMemo } from "react";

function Tournaments() {
  const {
    data: tournaments,
    isLoading: isLoadingTournaments,
    isError: isErrorTournaments,
  } = usePandaApi("tournaments");

  const {
    data: videoGames,
    isLoading: isLoadingGames,
    isError: isErrorGames,
  } = usePandaApi("videogames");

  // Enrich tournaments with game data using useMemo
  const enrichedTournaments = useMemo(() => {
    if (!isLoadingGames && tournaments.length > 0 && videoGames.length > 0) {
      return tournaments.map((tournament) => {
        const associatedGame = videoGames.find(
          (game) => game.id === tournament.videogame_id
        );
        return { ...tournament, game: associatedGame };
      });
    }
    return tournaments; // Return original list if games are not loaded yet or if there are no tournaments
  }, [tournaments, videoGames, isLoadingGames]);

  if (isLoadingTournaments || isLoadingGames) return <div>Loading...</div>;
  if (isErrorTournaments || isErrorGames)
    return <div>Error loading data. Please try again later.</div>;


  return (
    <div className="p-4">
      <div className="p-4 ml-40 mr-40 bg-cyan-950 rounded text-center">
        <h2 className="text-2xl mb-3 text-black text-center bg-white font-bold">
          Tournaments
        </h2>
        <div className="grid grid-cols-2 gap-5">
        {enrichedTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            See All
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tournaments;
