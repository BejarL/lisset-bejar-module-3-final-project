import { useRawgApi } from "../services/useRawgApi"; // Adjust the path according to your file structure
import { useState } from "react";
import GameCard from "./GameCard";


const AllGames = () => {
  const [page, setPage] = useState(1); // State to track current page

  const {
    data: games,
    isLoading,
    isError,
    loadMore, // Destructure the new function
  } = useRawgApi("games");

  // Function to load more games
  const loadMoreGames = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading)
    return <div className="text-center text-lg">Loading games...</div>;
  if (isError)
    return (
      <div className="text-center text-lg text-red-500">
        Failed to fetch games. Please try again later.
      </div>
    );

  return (
    <>
      <div className="p-8 bg-cyan-900 rounded text-center">
        <h2 className="text-2xl mb-3 text-black text-center font-bold">
          All Games
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent any default button action
              loadMore();
            }}
            className="text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Load more
          </button>
        </div>
      </div>
    </>
  );
};

export default AllGames;
