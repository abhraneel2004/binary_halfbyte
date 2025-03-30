import React, { useState, useEffect } from 'react';
import { Settings, BookMarked, History, Bell, Trash2 } from 'lucide-react';
import { useSavedArticles } from './SavedArticlesContext';
import { getAuth } from 'firebase/auth';

export function Profile() {
  const { savedArticles, removeArticle } = useSavedArticles();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the username from Firebase Auth
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUsername(user.displayName || 'User');
    } else {
      setUsername('Guest');
    }
    setLoading(false);
  }, []);

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

  const stats = [
    { label: 'Articles Read', value: '127' },
    { label: 'Saved Articles', value: savedArticles.length.toString() },
    { label: 'Reading Time', value: '32h' },
    { label: 'Categories', value: '8' },
  ];

  const recentActivity = savedArticles
    .slice(0, 5)
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
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Welcome {username}</h1>
                <p className="text-gray-600 dark:text-gray-300">Member since March 2025</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {activity.type === 'saved' ? 'Saved article' : 'Read article'}
                      </div>
                      <a href={activity.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-blue-600">
                        {activity.title}
                      </a>
                    </div>
                    <button onClick={() => removeArticle(activity.url)} className="text-gray-500 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
