import React, { useEffect } from "react";

const Index = () => {
  // Apply the theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">My Application</h1>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="hidden dark:block" // Sun icon (shown in dark mode)
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="block dark:hidden" // Moon icon (shown in light mode)
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </header>
      <main className="flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to Your App</h1>
          <p className="text-xl text-muted-foreground mb-4">Start building your amazing project here!</p>
          <div className="p-6 bg-card rounded-lg shadow-md max-w-md mx-auto text-card-foreground">
            <h2 className="text-2xl font-semibold mb-2">Features</h2>
            <p className="mb-4">This application now supports dark and light themes!</p>
            <ul className="text-left list-disc list-inside mb-4">
              <li>Automatic theme preference detection</li>
              <li>Manual theme toggle</li>
              <li>Persistent theme choice</li>
              <li>Smooth theme transitions</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
