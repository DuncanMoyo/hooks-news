import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchInputRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (error) {
      setError(error);
    }
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
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lighest shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          value={query}
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button className="bg-orange rounded m-1 p-1" type="submit">
          Search
        </button>
        <button
          className="bg-teal text-white p-1 rounded"
          type="button"
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>

      {loading ? (
        <div className="font-bold text-orange-dark">Loading results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(({ url, objectID, title }) => (
            <li key={objectID}>
              <a
                className="text-indigo-dark hover:text-indigo-darkest"
                href={url}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
};

export default App;
