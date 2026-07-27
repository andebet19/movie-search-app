"use client";

import { useMovies } from "../hooks/useMovies";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const { movies, loading, error, searchMovies } = useMovies();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Movie Search App
        </h1>

        <SearchBar onSearch={searchMovies} loading={loading} />

        {loading && <p className="text-center text-slate-400">Loading movies...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
}