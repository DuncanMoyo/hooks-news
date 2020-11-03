import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);

  const searchInputRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    setResults(response.data.hits);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          value={query}
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          ref={searchInputRef}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>
          Clear
        </button>
      </form>
      {loading ? (
        <div>Loading results...</div>
      ) : (
        <ul>
          {results.map(({ url, objectID, title }) => (
            <li key={objectID}>
              <a href={url}>{title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;
