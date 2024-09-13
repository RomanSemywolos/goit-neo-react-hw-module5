import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/movieApi";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import MoviesList from "../../components/MoviesList/MoviesList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results } = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        console.error("Error loading trending movies:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      {error && <Error />}
      <h2 className={styles.heading}>Trending Today</h2>
      <MoviesList movies={movies} state={{ from: location }} />
    </div>
  );
};

export default HomePage;
