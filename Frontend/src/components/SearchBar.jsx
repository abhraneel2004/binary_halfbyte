import React, { useState } from 'react';
import { Search } from 'lucide-react';

const categories = [
  'General', 'Sports', 'Technology', 'Business', 
  'Entertainment', 'Health', 'Science', 'Politics'
];

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, selectedCategory.toLowerCase());
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSearch(query, category.toLowerCase());
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
          type="submit"
          className="ml-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full border 
              ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} 
              hover:bg-blue-500 hover:text-white transition`}
          >
            {category}
          </button>
        ))}
      </div>
    </form>
  );
}
