import { useState } from "react";
import styles from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <button type="submit" className={styles.searchButton}>
        <BsSearch />
      </button>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className={styles.searchInput}
        placeholder="Search for movies..."
      />
    </form>
  );
};

export default SearchBar;