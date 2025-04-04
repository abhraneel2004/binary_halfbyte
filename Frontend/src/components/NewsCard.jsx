import React from 'react';
import { Bookmark, BookmarkCheck, Share2, Clock } from 'lucide-react';
import { useSavedArticles } from './SavedArticlesContext';

export function NewsCard({ title, description, imageUrl, source, publishedAt, url }) {
  const { savedArticles, saveArticle, removeArticle } = useSavedArticles();
  
  // Check if this article is already saved
  const isSaved = savedArticles.some(article => article.url === url);
  
  const handleSave = () => {
    if (isSaved) {
      removeArticle(url);
    } else {
      const article = {
        title,
        description,
        imageUrl,
        source,
        publishedAt,
        url
      };
      
      const saved = saveArticle(article);
      if (saved) {
        // Optional: Show a toast notification
        console.log('Article saved successfully');
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url,
      });
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop';
        }}
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{source}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Read more
          </a>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              aria-label={isSaved ? "Remove from saved" : "Save article"}
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-blue-600" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              aria-label="Share article"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}