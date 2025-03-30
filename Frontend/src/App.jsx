import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Newspaper, Settings as SettingsIcon, User } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { Profile } from './components/Profile';
import { Login } from './components/auth/Login';
import { SignUp } from './components/auth/SignUp';
import { SettingsMenu } from './components/SettingsMenu';
import { ProfileSetup } from './components/ProfileSetup';
import { useAuth } from './hooks/useAuth';
import { useDarkMode } from './hooks/useDarkMode';
import { HomePage } from './components/HomePage';
import { SavedArticlesProvider } from './components/SavedArticlesContext';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const { user, loading } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SavedArticlesProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
          <Toaster position="top-right" />
          <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <Newspaper className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <h1 className="text-2xl font-bold">News60</h1>
                </Link>
                <div className="flex items-center space-x-4">
                  {user ? (
                    <>
                      <Link to="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <User className="w-6 h-6" />
                      </Link>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      >
                        <SettingsIcon className="w-6 h-6" />
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {user ? (
                <>
                  <Route path="/profile" element={<Profile />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/profile" element={<Navigate to="/login" />} />
                </>
              )}
            </Routes>
          </div>

          {/* Footer (appears on all pages) */}
          <Footer />

          {/* Settings Menu */}
          {showSettings && <SettingsMenu isOpen={showSettings} onClose={() => setShowSettings(false)} />}
          {/* Profile Setup */}
          {showProfileSetup && <ProfileSetup onComplete={() => setShowProfileSetup(false)} />}
        </div>
      </Router>
    </SavedArticlesProvider>
  );
}

export default App;
