import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../api/movieApi";
import styles from "./MovieCast.module.css";
import placeholderImage from "../../assets/images/Portrait_placeholder.png";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await fetchMovieCast(id);
        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    if (id) fetchCast();
  }, [id]);

  return (
    <div>
      <ul className={styles.castList}>
        {cast.map(({ id, profile_path, name, character }) => (
          <li key={id} className={styles.castItem}>
            <img
              src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : placeholderImage}
              alt={name}
              width="200"
              onError={(e) => (e.target.src = placeholderImage)} // Додатково обробляємо випадки, якщо зображення не завантажилось
            />
            <p className={styles.actorName}>{name}</p>
            <p className={styles.actorCharacter}>{character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
