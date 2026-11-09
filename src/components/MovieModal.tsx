import { useEffect } from "react";
import { Heart, X, Youtube } from "lucide-react";

import type { Movie } from "../types";
import { getPosterUrl, getBackdropUrl } from "../data/sampleMovies";
import { getGenreNames } from "../data/genres";
import { useAppContext } from "../context/AppContext";

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

function MovieModal({ movie, onClose }: MovieModalProps) {
  const { isFavorite, toggleFavorite } = useAppContext();

  const favorite = isFavorite(movie.id);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${movie.title} official trailer`
  )}`;

  return (
    <div
      className="modal-overlay active"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close movie details"
        >
          <X size={22} />
        </button>

        <div
          className="modal-backdrop"
          style={{
            backgroundImage: `url(${getBackdropUrl(
              movie.backdrop_path
            )})`,
          }}
        />

        <div className="modal-body">
          <img
            className="modal-poster"
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
          />

          <div className="modal-content-details">
            <h2 id="movie-modal-title" className="modal-title">
              {movie.title}
            </h2>

            <div className="modal-meta-row">
              <span className="modal-meta-item">
                ⭐ {movie.vote_average.toFixed(1)} / 10
              </span>

              <span className="modal-meta-item">
                Release: {movie.release_date || "Unknown"}
              </span>
            </div>

            <div className="movie-genres-tags">
              {getGenreNames(movie.genre_ids).map((genre) => (
                <span className="genre-tag" key={genre}>
                  {genre}
                </span>
              ))}
            </div>

            <div>
              <h3 className="modal-overview-heading">Overview</h3>

              <p className="modal-overview">
                {movie.overview || "No overview available."}
              </p>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="favorite-btn"
                onClick={() => toggleFavorite(movie)}
                aria-pressed={favorite}
              >
                <Heart
                  size={18}
                  fill={favorite ? "currentColor" : "none"}
                />
                {favorite
                  ? "Remove from Watchlist"
                  : "Add to Watchlist"}
              </button>

              <a
                href={trailerUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-icon-label"
              >
                <Youtube size={18} />
                Watch Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
