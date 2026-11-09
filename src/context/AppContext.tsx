
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { Movie, Theme } from "../types";

// State managed globally by the application
type AppState = {
  favorites: Movie[];
  theme: Theme;
};

// Actions that can change the global state
type AppAction =
  | { type: "TOGGLE_FAVOURITE"; payload: Movie }
  | { type: "SET_THEME"; payload: Theme };

// Initial state, loaded from localStorage
const getInitialState = (): AppState => {
  let favorites: Movie[] = [];
  let theme: Theme = "dark";

  try {
    const savedFavorites = localStorage.getItem("cinegrid_favorites");
    const savedTheme = localStorage.getItem("cinegrid_theme");

    if (savedFavorites) {
      favorites = JSON.parse(savedFavorites);
    }

    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme;
    }
  } catch {
    favorites = [];
    theme = "dark";
  }

  return { favorites, theme };
};

// Reducer handles all state changes
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const alreadyFavorite = state.favorites.some(
        (movie) => movie.id === action.payload.id
      );

      return {
        ...state,
        favorites: alreadyFavorite
          ? state.favorites.filter(
              (movie) => movie.id !== action.payload.id
            )
          : [...state.favorites, action.payload],
      };
    }

    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
}

// Values and functions available to all components
type AppContextType = {
  favorites: Movie[];
  theme: Theme;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider makes global state available to its children
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    appReducer,
    undefined,
    getInitialState
  );

  const toggleFavorite = (movie: Movie) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: movie });
  };

  const isFavorite = (movieId: number) => {
    return state.favorites.some((movie) => movie.id === movieId);
  };

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  };

  // Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem(
      "cinegrid_favorites",
      JSON.stringify(state.favorites)
    );
  }, [state.favorites]);

  // Save theme and apply it to the HTML element
  useEffect(() => {
    localStorage.setItem("cinegrid_theme", state.theme);
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider
      value={{
        favorites: state.favorites,
        theme: state.theme,
        toggleFavorite,
        isFavorite,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for accessing the context
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}
