import type { Movie, ViewMode } from "../types";
import MovieCard from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
  view?: ViewMode;
};

const MovieList = ({
  movies,
  onMovieClick,
  view = "grid",
}: MovieListProps) => {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div
      className={`movies-grid ${
        view === "list" ? "compact-view" : ""
      }`}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick?.(movie)}
        />
      ))}
    </div>
  );
};

export default MovieList;
