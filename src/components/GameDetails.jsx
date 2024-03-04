// GameDetails.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GameDetails = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    // Fetch game details based on gameId
    // Example: You can fetch data from an API
    // Replace this with your actual data fetching logic
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`https://api.example.com/games/${gameId}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{game.name}</h2>
      <p>Release Date: {game.release_date}</p>
      <p>Description: {game.description}</p>
      {/* Add more game details as needed */}
    </div>
  );
};

export default GameDetails;
