export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
  const data = await res.json();
  
  if (data.Response === "True") {
    return data.Search;
  } else {
    throw new Error(data.Error || "No movies found.");
  }
};