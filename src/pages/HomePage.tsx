import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import type { Movie } from "../types";

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [minRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/movies");

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        setMovies(data.results ?? []);
      } catch {
        setMovies([]);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesRating = movie.vote_average >= minRating;

    return matchesQuery && matchesRating;
  });

  return (
    <main className="main-container">
      <h1>Movie App</h1>

      <SearchBar query={query} onChange={setQuery} />

      {loading && <p>Loading movies...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && <MovieList movies={filteredMovies} />}
    </main>
  );
}

export default HomePage;
