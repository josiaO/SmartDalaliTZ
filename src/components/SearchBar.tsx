import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search for courses, technologies, or topics..."
          className="w-full h-14 pl-12 pr-4 text-base rounded-full bg-card border border-input shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     transition-all duration-300 placeholder:text-muted-foreground"
        />
      </div>
    </form>
  );
};

export default SearchBar;
