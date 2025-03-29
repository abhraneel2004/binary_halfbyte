import React from 'react';
import { Settings, BookMarked, History, Bell } from 'lucide-react';

export function Profile() {
  const stats = [
    { label: 'Articles Read', value: '127' },
    { label: 'Saved Articles', value: '45' },
    { label: 'Reading Time', value: '32h' },
    { label: 'Categories', value: '8' },
  ];

  const recentActivity = [
    {
      type: 'saved',
      title: 'SpaceX Successfully Launches New Satellite Constellation',
      timestamp: '2 hours ago',
    },
    {
      type: 'read',
      title: 'Breakthrough in Renewable Energy Storage Technology',
      timestamp: '5 hours ago',
    },
    {
      type: 'saved',
      title: 'Global Summit Addresses Climate Change Challenges',
      timestamp: '1 day ago',
    },
  ];

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
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
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
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {activity.type === 'saved' ? 'Saved article' : 'Read article'}
                    </div>
                    <div className="font-medium">{activity.title}</div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {activity.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}