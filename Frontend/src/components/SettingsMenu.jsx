import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase'; // Corrected import for Firebase authentication
import { signOut } from 'firebase/auth'; // Importing signOut method from Firebase Auth
import toast from 'react-hot-toast';

export function SettingsMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth); // Correct Firebase sign-out method
      
      toast.success('Successfully logged out');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
          {showLogoutConfirm ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Confirm Logout
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Are you sure you want to log out? You'll need to sign in again to access your account.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                  ) : (
                    'Confirm Logout'
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}