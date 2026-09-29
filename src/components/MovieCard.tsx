import { useState } from "react";
import { getPosterUrl } from "../data/sampleMovies";
import type { MovieCardProps } from "../types";

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavouriteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setIsFavourite((current) => !current);
  };

  return (
    <article className="movie-card" onClick={onClick}>
      <div className="poster-wrapper">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="poster-img"
        />

        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {movie.vote_average.toFixed(1)}
            </span>

            <button
              type="button"
              className={`favorite-btn ${isFavourite ? "is-favourite" : ""}`}
              title={
                isFavourite ? "Remove from favourites" : "Add to favourites"
              }
              aria-label={
                isFavourite ? "Remove from favourites" : "Add to favourites"
              }
              onClick={handleFavouriteClick}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isFavourite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <span className="quick-view-hint">View Details</span>
        </div>
      </div>

      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>

        <div className="movie-card-meta">
          <span>{movie.release_date || "Unknown date"}</span>
          <span>{movie.vote_count}</span>
        </div>

        <div className="movie-genres-tags">
          {movie.genre_ids.slice(0, 2).map((genreId) => (
            <span className="genre-tag" key={genreId}>
              {genreId}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
