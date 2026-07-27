import { Movie } from "../lib/api";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-4 flex flex-col items-center">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x440?text=No+Poster"}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-bold text-center mb-1">{movie.Title}</h2>
      <p className="text-sm text-slate-400">{movie.Year}</p>
    </div>
  );
}