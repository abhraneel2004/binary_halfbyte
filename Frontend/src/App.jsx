import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Newspaper, Settings as SettingsIcon, User } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { NewsCard } from './components/NewsCard';
import { SearchBar } from './components/SearchBar';
import  Footer  from './components/Footer';
import { Profile } from './components/Profile';
import { Login } from './components/auth/Login';
import { SignUp } from './components/auth/SignUp';
import { SettingsMenu } from './components/SettingsMenu';
import { ProfileSetup } from './components/ProfileSetup';
import { useAuth } from './hooks/useAuth';
import { useDarkMode } from './hooks/useDarkMode';
import { HomePage } from './components/HomePage';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const { user, loading } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
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
                    <Link
                      to="/profile"
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <User className="w-6 h-6" />
                    </Link>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <SettingsIcon className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                  >
                    Login
                  </Link>
                )}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                      />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
          </Routes>
        </div>

        {/* Footer only shown on profile page */}
        <Routes>
          <Route path="/profile" element={<Footer />} />
        </Routes>

        {/* Settings Menu */}
        <SettingsMenu isOpen={showSettings} onClose={() => setShowSettings(false)} />

        {/* Profile Setup */}
        {showProfileSetup && <ProfileSetup onComplete={() => setShowProfileSetup(false)} />}
      </div>
    </Router>
  );
}

export default App;
