import { useState, useEffect } from "react";

function Typeahead() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 0) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 1000); // debounce delay

    return () => clearTimeout(handler);
  }, [query]);

  const fetchSuggestions = async (q: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.datamuse.com/sug?s=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setSuggestions(data.map((item: any) => item.word));
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 300, margin: "20px auto", fontFamily: "sans-serif" }}>
      <input
        type="text"
        value={query}
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />
      {loading && <p>Loading...</p>}
      <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
        {suggestions.map((s, i) => (
          <li
            key={i}
            style={{ padding: "4px 0", borderBottom: "1px solid #ddd" }}
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Typeahead;
