import { useState } from "react";
import { fetchMovies, Movie } from "../lib/api";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const results = await fetchMovies(query);
      setMovies(results);
    } catch (err: any) {
      setError(err.message || "Failed to fetch movies. Please check your connection.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, searchMovies };
};