import React from 'react';
import { Settings, BookMarked, History, Bell, Trash2 } from 'lucide-react';
import { useSavedArticles } from './SavedArticlesContext';

export function Profile() {
  const { savedArticles, removeArticle } = useSavedArticles();
  
  // Format date for display
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    
    return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
  };
  
  // Calculate stats
  const stats = [
    { 
      label: 'Articles Read', 
      value: '127' // This would need to be tracked separately
    },
    { 
      label: 'Saved Articles', 
      value: savedArticles.length.toString() 
    },
    { 
      label: 'Reading Time', 
      value: '32h' // This would need to be tracked separately
    },
    { 
      label: 'Categories', 
      value: '8' // This would need to be calculated from article metadata
    },
  ];

  // Get recent activity from saved articles
  const recentActivity = savedArticles
    .slice(0, 5) // Get the 5 most recent
    .map(article => ({
      type: 'saved',
      title: article.title,
      url: article.url,
      timestamp: formatTimeAgo(article.savedAt)
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-gray-600 dark:text-gray-300">Member since March 2025</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center"
              >
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <BookMarked className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Saved Articles</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Access your bookmarked articles for later reading
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <History className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Reading History</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Track your reading habits and history
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Notifications</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Customize your news alerts and notifications
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {activity.type === 'saved' ? 'Saved article' : 'Read article'}
                      </div>
                      <a 
                        href={activity.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-medium hover:text-blue-600"
                      >
                        {activity.title}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300 mr-3">
                        {activity.timestamp}
                      </span>
                      {activity.type === 'saved' && (
                        <button 
                          onClick={() => removeArticle(activity.url)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity to display</p>
                  <p className="text-sm mt-2">Start saving articles to see them here</p>
                </div>
              )}
            </div>
          </div>
          
          {savedArticles.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">All Saved Articles</h2>
              <div className="space-y-4">
                {savedArticles.map((article, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1 mr-4">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <span className="mr-3">{article.source}</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-medium hover:text-blue-600"
                      >
                        {article.title}
                      </a>
                    </div>
                    <button 
                      onClick={() => removeArticle(article.url)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                      aria-label="Remove saved article"
                    >
                      <Trash2 className="w-5 h-5 text-gray-500 hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}