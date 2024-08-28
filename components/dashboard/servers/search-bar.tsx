import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, disabled = false }) => (
  <div className="relative">
    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search servers..."
      className="pl-8 w-full"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      disabled={disabled}
    />
  </div>
);

export default SearchBar;