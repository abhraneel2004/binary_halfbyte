import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { NewsCard } from './NewsCard';
import { SearchBar } from './SearchBar';

const sampleNews = [
  {
    title: "SpaceX Successfully Launches New Satellite Constellation",
    description: "SpaceX has successfully launched its latest batch of satellites, expanding its global internet coverage network. The mission marks another milestone in the company's ambitious plans for worldwide internet access.",
    urlToImage: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&auto=format&fit=crop",
    source: { name: "Space News" },
    publishedAt: "2025-03-15T09:00:00Z",
    url: "#"
  },
  {
    title: "Breakthrough in Renewable Energy Storage Technology",
    description: "Scientists have developed a new type of battery that could revolutionize renewable energy storage, making solar and wind power more reliable than ever before.",
    urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
    source: { name: "Tech Review" },
    publishedAt: "2025-03-15T08:30:00Z",
    url: "#"
  },
  {
    title: "Global Summit Addresses Climate Change Challenges",
    description: "World leaders gather to discuss urgent actions needed to combat climate change, with new commitments to reduce carbon emissions and protect biodiversity.",
    urlToImage: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&auto=format&fit=crop",
    source: { name: "Environmental News" },
    publishedAt: "2025-03-15T08:00:00Z",
    url: "#"
  },
  {
    title: "AI System Makes Breakthrough in Medical Diagnosis",
    description: "A new artificial intelligence system has demonstrated unprecedented accuracy in diagnosing complex medical conditions, potentially revolutionizing healthcare delivery.",
    urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    source: { name: "Health Tech" },
    publishedAt: "2025-03-15T07:30:00Z",
    url: "#"
  },
  {
    title: "New Archaeological Discovery Reveals Ancient Civilization",
    description: "Archaeologists have uncovered a previously unknown ancient city, providing new insights into human civilization's early development and cultural practices.",
    urlToImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop",
    source: { name: "History Today" },
    publishedAt: "2025-03-15T07:00:00Z",
    url: "#"
  }
];

export function HomePage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    loadMoreNews();
  }, [page]);

  const loadMoreNews = () => {
    setTimeout(() => {
      setNews(prev => [...prev, ...sampleNews]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (inView) {
      setPage(prev => prev + 1);
    }
  }, [inView]);

  const handleSearch = (query: string) => {
    setNews([]);
    setPage(1);
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
      {loading && news.length === 0 ? (
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
      <div ref={ref} className="h-10" />
    </main>
  );
}