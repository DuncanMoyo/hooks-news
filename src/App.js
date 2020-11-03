import React, { useState, useEffect } from "react";

import axios from "axios";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("reacthooks");

  const fetchData = async () => {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    setResults(response.data.hits);
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <>
      <input type="text" onChange={(event) => setQuery(event.target.value)} />
      <ul>
        {results.map(({ url, objectID, title }) => (
          <li key={objectID}>
            <a href={url}>{title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
