import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const categories = [
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'politics', name: 'Politics', icon: '🏛️' },
  { id: 'world', name: 'World News', icon: '🌍' },
];

const newsSources = [
  { id: 'reuters', name: 'Reuters', logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100' },
  { id: 'ap', name: 'Associated Press', logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100' },
  { id: 'bbc', name: 'BBC News', logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100' },
  { id: 'bloomberg', name: 'Bloomberg', logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100' },
];

export function ProfileSetup({ onComplete }) {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    categories: [],
    sources: [],
    notifications: { breaking: true, daily: false, weekly: false },
    layout: 'grid',
  });
  const [loading, setLoading] = useState(false);

  const handleToggle = (key, id) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: prev[key].includes(id)
        ? prev[key].filter((item) => item !== id)
        : [...prev[key], id],
    }));
  };

  const handleNotificationChange = (key) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) throw new Error('No user found');

      await setDoc(doc(db, 'user_preferences', user.uid), {
        categories: preferences.categories,
        sources: preferences.sources,
        notifications: preferences.notifications,
        layout: preferences.layout,
      });

      toast.success('Profile preferences saved successfully!');
      onComplete();
      navigate('/');
    } catch (error) {
      toast.error('Failed to save preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Customize Your Preferences
            </h2>
            <button onClick={handleSubmit} className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md">
              {loading ? 'Saving...' : 'Complete Setup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}