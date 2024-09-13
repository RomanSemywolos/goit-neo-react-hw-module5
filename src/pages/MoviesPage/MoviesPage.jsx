import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MoviesList from "../../components/MoviesList/MoviesList";
import { searchMoviesByName } from "../../api/movieApi";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (query) => {
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

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loading />}
      {error && <Error />}
      <MoviesList movies={movies} />
    </>
  );
};

export default MoviesPage;
