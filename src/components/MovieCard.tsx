import { Heart } from "lucide-react";
import { getPosterUrl } from "../data/sampleMovies";
import { getGenreNames } from "../data/genres";
import { useAppContext } from "../context/AppContext";
import type { MovieCardProps } from "../types";

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const { isFavorite, toggleFavorite } = useAppContext();

  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <article
      className="movie-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="poster-wrapper">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="poster-img"
        />

        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>

            <button
              type="button"
              className={`favorite-btn ${favorite ? "is-favourite" : ""}`}
              title={
                favorite
                  ? "Remove from favourites"
                  : "Add to favourites"
              }
              aria-label={
                favorite
                  ? "Remove from favourites"
                  : "Add to favourites"
              }
              aria-pressed={favorite}
              onClick={handleFavoriteClick}
            >
              <Heart
                size={18}
                fill={favorite ? "currentColor" : "none"}
              />
            </button>
          </div>

          <span className="quick-view-hint">View Details</span>
        </div>
      </div>

      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>

        <div className="movie-card-meta">
          <span>{movie.release_date || "Unknown date"}</span>
          <span>{movie.vote_count} votes</span>
        </div>

        <div className="movie-genres-tags">
          {getGenreNames(movie.genre_ids)
            .slice(0, 2)
            .map((genre) => (
              <span className="genre-tag" key={genre}>
                {genre}
              </span>
            ))}
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
