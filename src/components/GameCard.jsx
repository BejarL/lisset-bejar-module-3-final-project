import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <div className="bg-teal-900 p-4 rounded-lg shadow-md">
      <img
        src={game.background_image}
        alt={`Cover of ${game.name}`}
        className="rounded flex justify-center items-center h-[200px] w-[500px]"
      />
      <Link to={`/games/${game.id}`} className="text-white mt-3 font-bold">
        {game.name}
      </Link>
      <div className="flex justify-between text-green-200 text-sm mt-2">
        <button className="hover:underline">Collection</button>
        <button className="hover:underline">Wishlist</button>
      </div>
    </div>
  );
};

export default GameCard;
