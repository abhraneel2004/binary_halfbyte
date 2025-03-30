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
    const isDuplicate = savedArticles.some((savedArticle) => savedArticle.url === article.url);

    if (!isDuplicate) {
      setSavedArticles((prevArticles) => {
        const newSavedArticles = [...prevArticles, {
          ...article,
          savedAt: new Date().toISOString()
        }];
        localStorage.setItem('savedArticles', JSON.stringify(newSavedArticles));
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
      localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
      return updatedArticles;
    });
  };

  return (
    <SavedArticlesContext.Provider value={{ savedArticles, saveArticle, removeArticle }}>
      {children}
      {/* <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4">
        <h3 className="text-lg font-semibold mb-2">Saved Article URLs:</h3>
        <div className="space-y-2"> */}
          {/* {savedArticles.map((article, index) => ( */}
      {/* //       <div key={index} className="p-2 bg-white dark:bg-gray-700 rounded-md">
      //         <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
      //           {article.url}
      //         </a>
      //       </div>
      //     ))}
      //   </div>
      // </div> */}
    </SavedArticlesContext.Provider>
  );
}

// Custom hook to use the saved articles context
export function useSavedArticles() {
  return useContext(SavedArticlesContext);
}
