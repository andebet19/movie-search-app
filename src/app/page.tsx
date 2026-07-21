"use client";

import { useState } from "react";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      // Using public OMDb API demo key for testing
      const res = await fetch(`https://www.omdbapi.com/?apikey=trilogy&s=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No movies found.");
      }
    } catch (err) {
      setError("Failed to fetch movies. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Movie Search App
        </h1>

        <form onSubmit={searchMovies} className="flex gap-4 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie (e.g., Avengers, Batman)..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-blue-500 text-white placeholder-slate-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl transition duration-200"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-slate-400">Loading movies...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-4 flex flex-col items-center">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x440?text=No+Poster"}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-bold text-center mb-1">{movie.Title}</h2>
              <p className="text-sm text-slate-400">{movie.Year}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}