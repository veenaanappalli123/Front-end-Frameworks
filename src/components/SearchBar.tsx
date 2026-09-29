type SearchBarProps = {
  query: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ query, onChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search movies..."
      aria-label="Search movies"
    />
  );
};

export default SearchBar;
