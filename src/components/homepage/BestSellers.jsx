import { useRawgApi } from "../../services/useRawgApi"; // Adjust the path according to your file structure
import { Link } from "react-router-dom";
import GameCard from "../GameCard";

const BestSellers = () => {
  // Use the custom hook to fetch best selling games
  const {
    data: games,
    isLoading,
    isError,
  } = useRawgApi("games", { ordering: "-rating" });

  if (isLoading) return <div className="text-center text-lg">Loading best sellers...</div>;
  if (isError) return <div className="text-center text-lg text-red-500">Failed to fetch best sellers. Please try again later.</div>;

  return (
    <div className="p-4 ml-40 mr-40 bg-cyan-900 rounded text-center"> 
      <h2 className="text-2xl mb-3 text-black text-center bg-white font-bold">
        Best Sellers
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/allGames" className="text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          See All
        </Link>
      </div>
    </div>
  );
};

export default BestSellers;