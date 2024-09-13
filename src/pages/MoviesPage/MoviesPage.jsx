import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import MoviesList from "../../components/MoviesList/MoviesList";
import { searchMoviesByName } from "../../api/movieApi";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      
      try {
        setIsLoading(true);
        setError(false);
        const { results } = await searchMoviesByName(query);
        setMovies(results);
      } catch (error) {
        console.error("Error searching movies:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (newQuery) => {
    setSearchParams(newQuery !== "" ? { query: newQuery } : {});
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} initialQuery={query} />
      {isLoading && <Loading />}
      {error && <Error />}
      <MoviesList movies={movies} />
    </>
  );
};

export default MoviesPage;