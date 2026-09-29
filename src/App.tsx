import { useState } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { SAMPLE_MOVIES } from "./data/sampleMovies";

function App() {
  const [movies] = useState(SAMPLE_MOVIES);
  const [query, setQuery] = useState("");
  const [minRating] = useState(0);

  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesRating = movie.vote_average >= minRating;

    return matchesQuery && matchesRating;
  });

  return (
    <div className="app-layout">
      <main className="main-container">
        <h1>Movie App</h1>

        <SearchBar query={query} onChange={setQuery} />

        <MovieList movies={filteredMovies} />
      </main>
    </div>
  );
}

export default App;
