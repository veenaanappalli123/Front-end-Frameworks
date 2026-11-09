import { Grid2X2, List } from "lucide-react";
import { GENRES } from "../data/genres";
import type { SortOption, ViewMode } from "../types";

type FilterBarProps = {
  selectedGenre: number | null;
  onGenreChange: (genre: number | null) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
};

function FilterBar({
  selectedGenre,
  onGenreChange,
  sort,
  onSortChange,
  view,
  onViewChange,
}: FilterBarProps) {
  return (
    <section className="filter-bar">
      <div className="genre-pills-scroll">
        <button
          type="button"
          className={`genre-pill ${
            selectedGenre === null ? "active" : ""
          }`}
          onClick={() => onGenreChange(null)}
        >
          All
        </button>

        {Object.entries(GENRES).map(([id, name]) => (
          <button
            type="button"
            key={id}
            className={`genre-pill ${
              selectedGenre === Number(id) ? "active" : ""
            }`}
            onClick={() => onGenreChange(Number(id))}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="filter-actions-right">
        <div className="sort-select-wrapper">
          <select
            className="sort-select"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as SortOption)
            }
            aria-label="Sort movies"
          >
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="release_date">Release Date</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div className="view-toggle-group">
          <button
            type="button"
            className={`view-btn ${view === "grid" ? "active" : ""}`}
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
          >
            <Grid2X2 size={17} />
          </button>

          <button
            type="button"
            className={`view-btn ${view === "list" ? "active" : ""}`}
            onClick={() => onViewChange("list")}
            aria-label="List view"
            aria-pressed={view === "list"}
          >
            <List size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FilterBar;
