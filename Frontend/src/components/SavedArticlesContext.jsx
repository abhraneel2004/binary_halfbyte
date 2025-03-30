import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the SavedArticlesContext
export const SavedArticlesContext = createContext();

// Create a provider component for saved articles
export function SavedArticlesProvider({ children }) {
  const [savedArticles, setSavedArticles] = useState([]);

  // Load saved articles from localStorage on mount
  useEffect(() => {
    const storedArticles = localStorage.getItem('savedArticles');
    if (storedArticles) {
      setSavedArticles(JSON.parse(storedArticles));
    }
  }, []);

  // Update localStorage whenever savedArticles changes
  useEffect(() => {
    if (savedArticles.length > 0) {
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    }
  }, [savedArticles]);

  // Function to save a new article
  const saveArticle = (article) => {
    // Check if article is already saved
    const isDuplicate = savedArticles.some((savedArticle) => savedArticle.url === article.url);

    if (!isDuplicate) {
      setSavedArticles((prevArticles) => {
        const newSavedArticles = [...prevArticles, { 
          ...article, 
          savedAt: new Date().toISOString() 
        }];
        localStorage.setItem('savedArticles', JSON.stringify(newSavedArticles)); // Sync to localStorage immediately
        return newSavedArticles;
      });
      return true;
    }
    return false;
  };

  // Function to remove a saved article
  const removeArticle = (url) => {
    setSavedArticles((prevArticles) => {
      const updatedArticles = prevArticles.filter((article) => article.url !== url);
      localStorage.setItem('savedArticles', JSON.stringify(updatedArticles)); // Sync to localStorage immediately
      return updatedArticles;
    });
  };

  return (
    <SavedArticlesContext.Provider value={{ savedArticles, saveArticle, removeArticle }}>
      {children}
    </SavedArticlesContext.Provider>
  );
}

// Custom hook to use the saved articles context
export function useSavedArticles() {
  return useContext(SavedArticlesContext);
}
