import type { Movie, Theme } from "../types";

const FAVORITES_KEY = "cinegrid_favorites";
const THEME_KEY = "cinegrid_theme";
const API_KEY = "cinegrid_api_key";

export const storage = {
  getFavorites(): Movie[] {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  setFavorites(favorites: Movie[]): void {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  },

  toggleFavorite(movie: Movie): Movie[] {
    const favorites = this.getFavorites();

    const exists = favorites.some((item) => item.id === movie.id);

    const updated = exists
      ? favorites.filter((item) => item.id !== movie.id)
      : [...favorites, movie];

    this.setFavorites(updated);
    return updated;
  },

  getTheme(): Theme {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" ? "light" : "dark";
  },

  setTheme(theme: Theme): void {
    localStorage.setItem(THEME_KEY, theme);
  },

  getApiKey(): string {
    return (
      localStorage.getItem(API_KEY) ||
      import.meta.env.VITE_TMDB_API_KEY ||
      ""
    );
  },

  setApiKey(apiKey: string): void {
    localStorage.setItem(API_KEY, apiKey.trim());
  },
};
