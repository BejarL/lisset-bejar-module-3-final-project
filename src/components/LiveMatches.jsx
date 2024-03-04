import { useEffect, useState } from "react";
import { usePandaApi } from "../services/usePandaApi";
import { useParams } from "react-router-dom";
import { WebsocketService } from "../services/WebsocketService";

function LiveMatches() {
  let { gameId } = useParams();
  const [liveMatches, setLiveMatches] = useState([]);
  const apiKey = import.meta.env.VITE_PANDASCORE_API_KEY_B;

  useEffect(() => {
    const wsService = new WebsocketService("wss://live.pandascore.co/matches"); // Ensure correct class instantiation
    wsService.connect(`${gameId}/events`, apiKey);

    wsService.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLiveMatches((currentMatches) => [...currentMatches, data]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    return () => {
      wsService.disconnect();
    };
  }, [gameId, apiKey]); // Ensure correct dependency array

  const {
    data: previousMatches,
    isLoading: previousMatchesLoading,
    isError: previousMatchesError,
  } = usePandaApi("matches", {
    "filter[videogame_id]": gameId,
    "filter[status]": "finished",
  });

  if (previousMatchesLoading) return <div>Loading previous matches...</div>;
  if (previousMatchesError) return <div>Error fetching previous matches.</div>;

  return (
    <div>
      <h2>Live Matches</h2>
      {liveMatches.length > 0 ? (
        liveMatches.map((match, index) => (
          <div key={index}>
            <p>Live Match ID: {match.match_id}</p>
            {/* Render other live match details */}
          </div>
        ))
      ) : (
        <div>
          <h3>Previous Matches</h3>
          {previousMatches.map((match) => (
            <div key={match.id}>
              <p>Previous Match ID: {match.id}</p>
              {/* Render other previous match details */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LiveMatches;
