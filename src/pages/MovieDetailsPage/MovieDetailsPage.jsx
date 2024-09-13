import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById } from "../../api/movieApi";
import styles from "./MovieDetailsPage.module.css";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadMovieDetails();
  }, [id]);

  const goBack = () => navigate(location.state?.from ?? "/");

  return (
    <div className={styles.container}>
      <button type="button" onClick={goBack} className={styles.goBackButton}>
        Go back
      </button>
      {isLoading && <Loading />}
      {error && <Error />}
      {movie && (
        <div className={styles.movieDetails}>
          <img
            className={styles.poster}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={styles.details}>
            <h2>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
            <p className={styles.userScore}>User Score: {movie.vote_average * 10}%</p>
            <p className={styles.genres}>
              <strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}
            </p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      )}
      <div className={styles.links}>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
