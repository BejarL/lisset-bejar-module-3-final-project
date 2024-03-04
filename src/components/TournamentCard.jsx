import { Link, useNavigate } from 'react-router-dom';

const TournamentCard = ({ tournament }) => {
  const navigate = useNavigate();

  const startDate = tournament.begin_at
    ? new Date(tournament.begin_at).toLocaleDateString()
    : "N/A";
  const endDate = tournament.end_at
    ? new Date(tournament.end_at).toLocaleDateString()
    : "N/A";

  // Fallback for when the game details are not available
  const gameName = tournament.videogame
    ? tournament.videogame.name
    : "Unknown Game";

    // Function to handle clicking the "Matches" button
    const handleViewMatches = () => {
      navigate(`/live-matches/${tournament.videogame.id}`);
    };

  return (
    <div className="bg-teal-950 p-4 rounded-lg shadow-md">
      <div className="text-white mt-3 font-bold">{gameName}</div>
      <div className="text-green-300 text-sm">{tournament.name}</div>
      <div className="text-green-200 text-sm mt-2">
        Start: {startDate}
        <br />
        End: {endDate}
      </div>
      <div className="flex justify-between text-green-200 text-sm mt-2">
        <Link
          to='/tournamentDetails'
          className="hover:underline"
          aria-label="View tournament details"
        >
          Details
        </Link>
        <button onClick={handleViewMatches} className="hover:underline" aria-label="View matches">
          Matches
        </button>
      </div>
    </div>
  );
};

export default TournamentCard;
