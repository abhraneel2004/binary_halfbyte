# News60

## Introduction

In today's digital era, a massive influx of news from various sources often overwhelms users. It is difficult to distinguish between relevant, reliable, and real-time information. **News60** aims to solve this by providing an **AI-powered, personalized news platform** that delivers concise, fact-checked, and real-time news updates.

## Problem Statement

With a vast amount of news from various sources, people often struggle to keep up with reliable and important information. Many news platforms present cluttered interfaces, lengthy articles, and unreliable sources, making it hard for users to consume meaningful content efficiently.

To solve this, we need a **modern, user-friendly website** that delivers **fact-checked, personalized, real-time news** while ensuring a seamless reading experience across different devices.

## Solution Approach

### News60 - A Smarter Way to Stay Updated

**News60** is designed to provide:
- **AI-Powered Personalized News Feed**: Users get customized news based on their interests and reading habits.
- **Real-time News Updates with Push Notifications**: Ensures users never miss out on critical events.
- **Multilingual and Accessibility Features**: Makes news accessible to a diverse audience.

### Key Features
- **Summarized News in 60 Words**: Each article is shortened to around 60 words, delivering only the most essential information.
- **Trending & Popular News**: The most relevant and widely discussed news is prioritized.
- **Save Articles for Later**: Users can bookmark important news pieces.
- **AI-Generated Reliable Summaries**: Enhances the credibility and readability of news.
- **Seamless User Experience**: Designed with a clean, intuitive UI for effortless navigation.

## Tech Stack
- **Frontend**: React.js (for a responsive and dynamic user interface)
- **Backend**: Firebase (for authentication, database, and cloud functions)
- **API**: NewsAPI (for fetching real-time news data)

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Run the Project Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/news60.git
   cd news60
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project
   - Enable Firestore and Authentication
   - Obtain Firebase config and store it in `.env.local`
4. Set up NewsAPI:
   - Sign up at [NewsAPI](https://newsapi.org/)
   - Obtain an API key
   - Add the API key to `.env.local`
5. Start the development server:
   ```sh
   npm start
   ```
6. Open the application in the browser at `http://localhost:3000`

## Project Structure
```
Frontend/.gitignore
Frontend/eslint.config.js
Frontend/index.html
Frontend/package-lock.json
Frontend/package.json
Frontend/postcss.config.js
Frontend/src/App.jsx
Frontend/src/components/Footer.jsx
Frontend/src/components/HomePage.jsx
Frontend/src/components/NewsCard.jsx
Frontend/src/components/Profile.jsx
Frontend/src/components/ProfileSetup.jsx
Frontend/src/components/SavedArticlesContext.jsx
Frontend/src/components/SearchBar.jsx
Frontend/src/components/SettingsMenu.jsx
Frontend/src/components/auth/Login.jsx
Frontend/src/components/auth/SignUp.jsx
Frontend/src/components/auth/firebase/firebaseConfig.js
Frontend/src/hooks/useAuth.js
Frontend/src/hooks/useDarkMode.js
Frontend/src/index.css
Frontend/src/lib/authMethods.js
Frontend/src/lib/firebase.js
Frontend/src/main.jsx
Frontend/src/utils/userProfile.js
Frontend/src/vite-env.d.ts
Frontend/tailwind.config.js
Frontend/test.js
Frontend/tsconfig.app.json
Frontend/tsconfig.json
Frontend/tsconfig.node.json
Frontend/vite.config.js
```

## Deployment
To deploy the project:
1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy using Firebase Hosting:
   ```sh
   firebase deploy
   ```

## Future Enhancements
- **Voice-based News Summaries**
- **Dark Mode for Better Readability**
- **Offline News Availability**
- **User Preference-based Content Filtering**

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## Contact
For any queries or collaborations, reach out to **[contact.abhraneel@gmail.com, sadabhijit2004@gmail.com]**.

