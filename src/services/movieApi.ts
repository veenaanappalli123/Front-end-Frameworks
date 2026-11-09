
import type { Movie, SortOption } from "../types";
import { SAMPLE_MOVIES } from "../data/sampleMovies";
import { storage } from "../utils/storage";

const BASE_URL = "https://api.themoviedb.org/3";

type TMDBResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type MovieFilters = {
  search?: string;
  genre?: number | null;
  page?: number;
  onlyFavorites?: boolean;
};

function filterMovies(
  movies: Movie[],
  search = "",
  genre: number | null = null
): Movie[] {
  return movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === null || movie.genre_ids.includes(genre);

    return matchesSearch && matchesGenre;
  });
}

export function sortMovies(
  movies: Movie[],
  sort: SortOption
): Movie[] {
  const sorted = [...movies];

  switch (sort) {
    case "popularity":
      return sorted.sort((a, b) => b.popularity - a.popularity);

    case "rating":
      return sorted.sort((a, b) => b.vote_average - a.vote_average);

    case "release_date":
      return sorted.sort((a, b) =>
        b.release_date.localeCompare(a.release_date)
      );

    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
}

export async function getMovies(
  filters: MovieFilters = {}
): Promise<Movie[]> {
  const {
    search = "",
    genre = null,
    page = 1,
    onlyFavorites = false,
  } = filters;

  // Favourites are already stored locally: no API request needed.
  if (onlyFavorites) {
    return filterMovies(storage.getFavorites(), search, genre);
  }

  const apiKey = storage.getApiKey();

  // Use sample movies if there is no API key.
  if (!apiKey) {
    return filterMovies(SAMPLE_MOVIES, search, genre);
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    page: String(page),
  });

  let endpoint = "/movie/popular";

  if (search.trim()) {
    endpoint = "/search/movie";
    params.set("query", search.trim());
  } else if (genre !== null) {
    endpoint = "/discover/movie";
    params.set("with_genres", String(genre));
  }

  const response = await fetch(
    `${BASE_URL}${endpoint}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`
    );
  }

  const data: TMDBResponse = await response.json();

  return data.results;
}

export async function getPopularMovies(): Promise<Movie[]> {
  return getMovies();
}
