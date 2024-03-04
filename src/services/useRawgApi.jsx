import { useState, useEffect } from "react";

export const useRawgApi = (endpoint, queryParams = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1); // New state for tracking current page

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams({ ...queryParams, page }).toString();
        const apiKey = import.meta.env.VITE_RAWG_API_KEY_A;
        const url = `https://api.rawg.io/api/${endpoint}?key=${apiKey}&${params}`;
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData((prevData) => [...prevData, ...(result.results || [])]); // Append new data
      } catch (error) {
        if (!signal.aborted) {
          setIsError(true);
          console.error("Fetch error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [endpoint, JSON.stringify(queryParams), page]); // Include `page` in the dependencies

  const loadMore = () => setPage((prevPage) => prevPage + 1); // Function to increment page

  return { data, isLoading, isError, loadMore };
};
