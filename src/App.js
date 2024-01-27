import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Replace 'YOUR_LAMBDA_ENDPOINT' with the actual endpoint URL of your AWS Lambda API
      const response = await fetch(`https://o1g44hhuwb.execute-api.us-east-1.amazonaws.com/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // You can add initial data loading or other setup logic here if needed
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search App</h1>
      </header>
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {loading && <p className="loading">Loading...</p>}
        {results.length > 0 ? (
          <div className="results">
            <h2>Search Results</h2>
            <ul>
              {results.map((person) => (
                <li key={person.id}>
                  <h3>{person.name}</h3>
                  <p>{person.title}</p>
                  <p>Skills: {person.skills.join(', ')}</p>
                  <p>Connections: {person.connections.join(', ')}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </main>
    </div>
  );
}

export default App;
