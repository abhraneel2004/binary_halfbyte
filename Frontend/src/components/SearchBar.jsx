import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
        />
        <button
          type="button"
          className="absolute right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <Filter className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </form>
  );
}
