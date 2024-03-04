import { useState, useEffect } from "react";

export const usePandaApi = (
  endpoint,
  queryParams = {},
  dataType = "tournaments"
) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(""); // Store error details

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(""); // Reset error message;

      try {
        const params = new URLSearchParams(queryParams).toString();
        const apiKey = import.meta.env.VITE_PANDASCORE_API_KEY_B;

        let url = "";
        if (dataType === "tournaments") {
          url = `https://api.pandascore.co/tournaments?${params}`;
        } else if (dataType === "matches") {
          url = `https://api.pandascore.co/matches/past?${params}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          const errorMessage = `HTTP error! status: ${response.status}`;
          throw new Error(errorMessage);
        }

        const result = await response.json();
        setData(result || []); // Assuming the response directly contains the array of tournaments or matches
      } catch (error) {
        setIsError(true);
        setError(error.message); // Set error message to the caught error's message
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function to abort fetch on unmount
    return () => {
      abortController.abort();
    };
    // Since we're not dynamically changing the endpoint, we only listen to changes in queryParams and dataType
  }, [JSON.stringify(queryParams), dataType]);

  return { data, isLoading, isError };
};
