import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";
import { getImageUrl } from "../../services/movieService";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            className={styles.card}
            onClick={() => onSelect(movie)}
            role="button"
            tabIndex={0}
          >
            <img
              className={styles.image}
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
