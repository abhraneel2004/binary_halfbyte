import React, { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { SearchBar } from './SearchBar';

export function HomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [category, setCategory] = useState('general');

  const apiKey = "6c17f1839cbb48d4840e6e70370799a2";

  const getNews = async () => {
    try {
      setLoading(true);

      let url = '';
      if (searchItem) {
        // Use 'everything' endpoint for text-based search
        console.log(searchItem);
        let temp = searchItem.split(' ');
        console.log(temp)
        let temp2 = temp.join(',')
        console.log(temp2)
        url = `https://newsapi.org/v2/everything?q=${searchItem}&sortBy=popularity&apiKey=${apiKey}`;
      } else {
        // Use 'top-headlines' endpoint for category-based news
        url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
      }

      const response = await fetch(url);
      const json = await response.json();
      if (json.articles) {
        setNews(json.articles);
      } else {
        console.error('Error fetching articles:', json);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, [category, searchItem]);

  const handleSearch = (query, selectedCategory) => {
    setSearchItem(query);
    setCategory(selectedCategory);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.length > 0 ? (
            news.map((article, index) => (
              <NewsCard
                key={`${article.url}-${index}`}
                title={article.title}
                description={article.description}
                imageUrl={article.urlToImage}
                source={article.source.name}
                publishedAt={article.publishedAt}
                url={article.url}
              />
            ))
          ) : (
            <div className="text-gray-500">No news found. Try a different search or category.</div>
          )}
        </div>
      )}
    </main>
  );
}
