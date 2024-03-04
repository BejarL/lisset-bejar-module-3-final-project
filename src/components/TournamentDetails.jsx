import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TournamentDetails = () => {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const response = await fetch(`https://api.pandascore.co/tournaments/${tournamentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tournament details');
        }
        const data = await response.json();
        setTournament(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTournamentDetails();
  }, [tournamentId]);

  if (!tournament) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-teal-950 p-4 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold">{tournament.name}</h2>
      <p className="text-sm text-green-300">Start: {new Date(tournament.begin_at).toLocaleDateString()}</p>
      <p className="text-sm text-green-300">End: {new Date(tournament.end_at).toLocaleDateString()}</p>
      <p className="text-sm text-green-200">Game: {tournament.videogame?.name || 'Unknown Game'}</p>
      <p className="text-sm text-green-200">Location: {tournament.location || 'N/A'}</p>
      <p className="text-sm text-green-200">Organizer: {tournament.organizer || 'N/A'}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default TournamentDetails;
