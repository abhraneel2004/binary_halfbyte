import React, { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { SearchBar } from './SearchBar';

export function HomePage() {
  const [news, setNews] = useState([])

  // Optional: Make query dynamic later
  const query = "everything?q=india&from=2025-03-26&to=2025-03-29&sortBy=popularity"
  const apiKey = "d3edc3f3c4d14b2e949dfd85b53ce325"

  const getNews = async () => {
      try {
          const url = "https://newsapi.org/v2/"+query+"&apiKey="+apiKey
          const response = await fetch(url)
          const json = await response.json()
          if (json.articles) {
              setNews(json.articles)
          } else {
              console.error('Error fetching articles:', json)
          }
      } catch (err) {
          console.error('Error fetching news:', err)
      }
  }

  useEffect(() => {
      getNews()
  }, [])

  // const [news, setNews] = useState(sampleNews);
  const [loading, setLoading] = useState(false);

  const handleSearch = (query) => {
    setLoading(true);
    setTimeout(() => {
      setNews(sampleNews.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      ));
      setLoading(false);
    }, 500);
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
          {news.map((article, index) => (
            <NewsCard
              key={`${article.url}-${index}`}
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              source={article.source.name}
              publishedAt={article.publishedAt}
              url={article.url}
            />
          ))}
        </div>
      )}
    </main>
  );
}
