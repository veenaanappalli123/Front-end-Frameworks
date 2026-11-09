import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Heart,
  Home,
  Info,
  KeyRound,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";

import { useAppContext } from "../context/AppContext";
import ApiConfigModal from "./ApiConfigModal";

type HeaderProps = {
  search: string;
  onSearch: (value: string) => void;
  onlyFavorites: boolean;
  onToggleFavorites: () => void;
  onApiKeySaved: () => void;
};

function Header({
  search,
  onSearch,
  onlyFavorites,
  onToggleFavorites,
  onApiKeySaved,
}: HeaderProps) {
  const { favorites, theme, toggleTheme } = useAppContext();
  const [showApiModal, setShowApiModal] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand-logo">
            <span className="logo-dot" />
            <span className="logo-text">CineGrid</span>
            <span className="brand-badge">Movie App</span>
          </NavLink>

          <div className="header-search">
            <div className="search-input-wrapper">
              <Search className="search-icon" />

              <input
                className="search-input"
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(event) => onSearch(event.target.value)}
                aria-label="Search movies"
              />

              {search && (
                <button
                  className="search-clear-btn"
                  type="button"
                  onClick={() => onSearch("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <nav className="header-actions">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `btn-icon-label ${isActive ? "active" : ""}`
              }
            >
              <Home size={16} />
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `btn-icon-label ${isActive ? "active" : ""}`
              }
            >
              <Info size={16} />
              About
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `btn-icon-label ${isActive ? "active" : ""}`
              }
            >
              <Heart size={16} />
              Favorites
              <span className="count-badge">{favorites.length}</span>
            </NavLink>

            <button
              type="button"
              className={`btn-icon-label ${onlyFavorites ? "active" : ""}`}
              onClick={onToggleFavorites}
              title="Show favourites on home page"
            >
              <Heart size={16} />
              {onlyFavorites ? "All Movies" : "Only Favourites"}
            </button>

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setShowApiModal(true)}
              aria-label="Configure TMDB API key"
              title="API Settings"
            >
              <KeyRound size={18} />
            </button>
          </nav>
        </div>
      </header>

      {showApiModal && (
        <ApiConfigModal
          onClose={() => setShowApiModal(false)}
          onSave={onApiKeySaved}
        />
      )}
    </>
  );
}

export default Header;
