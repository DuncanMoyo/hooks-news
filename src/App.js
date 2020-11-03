import React, { useState, useEffect } from "react";

import axios from "axios";

const App = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    const response = await axios
    .get("http://hn.algolia.com/api/v1/search?query=reacthooks");
    setResults(response.data.hits)
  }

  return (
    <>
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
