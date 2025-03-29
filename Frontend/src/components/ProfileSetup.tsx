import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface NewsSource {
  id: string;
  name: string;
  logo: string;
}

const categories: Category[] = [
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'politics', name: 'Politics', icon: '🏛️' },
  { id: 'world', name: 'World News', icon: '🌍' },
];

const newsSources: NewsSource[] = [
  { id: 'reuters', name: 'Reuters', logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100' },
  { id: 'ap', name: 'Associated Press', logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100' },
  { id: 'bbc', name: 'BBC News', logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100' },
  { id: 'bloomberg', name: 'Bloomberg', logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100' },
];

interface ProfileSetupProps {
  onComplete: () => void;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    categories: [] as string[],
    sources: [] as string[],
    notifications: {
      breaking: true,
      daily: false,
      weekly: false,
    },
    layout: 'grid',
  });
  const [loading, setLoading] = useState(false);

  const handleCategoryToggle = (categoryId: string) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handleSourceToggle = (sourceId: string) => {
    setPreferences(prev => ({
      ...prev,
      sources: prev.sources.includes(sourceId)
        ? prev.sources.filter(id => id !== sourceId)
        : [...prev.sources, sourceId],
    }));
  };

  const handleNotificationChange = (key: keyof typeof preferences.notifications) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleLayoutChange = (layout: string) => {
    setPreferences(prev => ({
      ...prev,
      layout,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          categories: preferences.categories,
          sources: preferences.sources,
          notifications: preferences.notifications,
          layout: preferences.layout,
        });

      if (error) throw error;

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
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {step === 1 && 'Select Your Interests'}
                  {step === 2 && 'Choose News Sources'}
                  {step === 3 && 'Notification Preferences'}
                  {step === 4 && 'Customize Your Feed'}
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Step {step} of 4
                </div>
              </div>
              <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-1 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Select categories that interest you. This helps us personalize your news feed.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        preferences.categories.includes(category.id)
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Select your preferred news sources. You can always modify these later.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {newsSources.map(source => (
                    <button
                      key={source.id}
                      onClick={() => handleSourceToggle(source.id)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        preferences.sources.includes(source.id)
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <img
                        src={source.logo}
                        alt={source.name}
                        className="w-12 h-12 object-contain mb-2"
                      />
                      <div className="font-medium text-gray-900 dark:text-white">
                        {source.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Choose how you'd like to receive news updates.
                </p>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.breaking}
                      onChange={() => handleNotificationChange('breaking')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-900 dark:text-white">Breaking News Alerts</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.daily}
                      onChange={() => handleNotificationChange('daily')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-900 dark:text-white">Daily Digest</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.weekly}
                      onChange={() => handleNotificationChange('weekly')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-900 dark:text-white">Weekly Summary</span>
                  </label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Choose how you'd like your news feed to be displayed.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleLayoutChange('grid')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      preferences.layout === 'grid'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-gray-200 dark:bg-gray-700 h-12 rounded" />
                      <div className="bg-gray-200 dark:bg-gray-700 h-12 rounded" />
                      <div className="bg-gray-200 dark:bg-gray-700 h-12 rounded" />
                      <div className="bg-gray-200 dark:bg-gray-700 h-12 rounded" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Grid Layout</span>
                  </button>
                  <button
                    onClick={() => handleLayoutChange('list')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      preferences.layout === 'list'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <div className="space-y-2 mb-3">
                      <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded" />
                      <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded" />
                      <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">List Layout</span>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                >
                  Previous
                </button>
              )}
              <div className="ml-auto">
                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                    ) : (
                      'Complete Setup'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}