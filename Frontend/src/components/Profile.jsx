import React, { useEffect, useState } from 'react';
import { Settings, BookMarked, History, Bell, Trash2 } from 'lucide-react';
import { useSavedArticles } from './SavedArticlesContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function Profile() {
  const { savedArticles, removeArticle } = useSavedArticles();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || 'User',
          email: currentUser.email,
          creationTime: currentUser.metadata.creationTime,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Format date for display
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  };

  // Calculate stats dynamically
  useEffect(() => {
    const totalArticles = savedArticles.length;
    const totalCategories = new Set(savedArticles.map(article => article.category)).size;
    const totalReadingTime = totalArticles * 5; // Assuming average 5 minutes per article
    setStats([
      // { label: 'Articles Read', value: totalArticles.toString() },
      { label: 'Saved Articles', value: totalArticles.toString() },
      // { label: 'Reading Time', value: `${totalReadingTime} mins` },
      // { label: 'Categories', value: totalCategories.toString() },
    ]);

    setRecentActivity(savedArticles.slice(0, 5).map((article) => ({
      type: 'saved',
      title: article.title,
      url: article.url,
      timestamp: formatTimeAgo(article.savedAt),
    })));
  }, [savedArticles]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.name || 'User'}</h1>
              {user?.creationTime && (
                <p className="text-gray-600 dark:text-gray-300">Member since {new Date(user.creationTime).toLocaleDateString()}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Saved News</h2>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Saved article</div>
                      <a href={activity.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-blue-600">{activity.title}</a>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300 mr-3">{activity.timestamp}</span>
                      <button onClick={() => removeArticle(activity.url)} className="text-gray-500 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity to display</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
