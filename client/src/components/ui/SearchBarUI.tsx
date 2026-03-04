import React, { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full h-14 group">
      {/* Icon Tìm kiếm bên trái */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
      </div>

      <input
        type="text"
        className="block w-full h-full pl-12 pr-12 bg-white border border-slate-200 rounded-2xl 
                     text-slate-700 text-lg placeholder:text-slate-400
                     focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 
                     shadow-sm transition-all duration-200"
        placeholder="Bạn đang tìm gì..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Nút Xóa bên phải */}
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
