import { useEffect, useMemo, useState } from "react";

import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import FilterBar from "../components/FilterBar";
import StatsBanner from "../components/StatsBanner";

import { getMovies, sortMovies } from "../services/movieApi";
import { GENRES } from "../data/genres";
import { storage } from "../utils/storage";

import type { Movie, SortOption, ViewMode } from "../types";

type HomePageProps = {
  search?: string;
  onlyFavorites?: boolean;
  refreshKey?: number;
};

function HomePage({
  search = "",
  onlyFavorites = false,
  refreshKey = 0,
}: HomePageProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("popularity");
  const [view, setView] = useState<ViewMode>("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMovies({
          search,
          genre: selectedGenre,
          onlyFavorites,
        });

        if (!cancelled) {
          setMovies(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading movies."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [search, selectedGenre, onlyFavorites, refreshKey]);

  const sortedMovies = useMemo(
    () => sortMovies(movies, sort),
    [movies, sort]
  );

  const activeGenre =
    selectedGenre === null
      ? "All"
      : GENRES[selectedGenre] ?? "Other";

  const isLive = Boolean(storage.getApiKey());

  return (
    <main className="main-container">
      <div className="page-heading">
        <h1>Discover Movies</h1>
        <p>Explore popular movies and find your next favourite.</p>
      </div>

      <StatsBanner
        movies={sortedMovies}
        activeGenre={activeGenre}
        isLive={isLive}
      />

      <FilterBar
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
      />

      {loading && <p>Loading movies...</p>}

      {error && (
        <p role="alert">
          Error: {error}
        </p>
      )}

      {!loading && !error && sortedMovies.length === 0 && (
        <div className="empty-state">
          <h2>No movies found</h2>
          <p>Try another search or select a different genre.</p>

          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setSelectedGenre(null);
              setSort("popularity");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {!loading && !error && sortedMovies.length > 0 && (
        <div className={view === "grid" ? "movies-grid" : "movies-grid compact-view"}>
          <MovieList
            movies={sortedMovies}
            onMovieClick={setSelectedMovie}
          />
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
}

export default HomePage;
