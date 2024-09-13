import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api/movieApi";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchMovieReviews(id);
        setReviews(data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (id) fetchReviews();
  }, [id]);

  return (
    <div className={styles.reviewsContainer}>
      {reviews.length > 0 ? (
        <ul className={styles.reviewsList}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={styles.reviewItem}>
              <h3>Author: {author}</h3>
              <p dangerouslySetInnerHTML={{ __html: content }} />
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no reviews for this movie yet</p>
      )}
    </div>
  );
};

export default MovieReviews;
