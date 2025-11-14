import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]); // clear previous results
    setError(null);
    setLoading(true);

    try {
      const data = await fetchMovies({ query });
      if (!data.results || data.results.length === 0) {
        toast.error("No movies found for your request.");
        setMovies([]);
        return;
      }
      setMovies(data.results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch");
      toast.error("There was an error fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelected(movie);
  };

  const handleCloseModal = () => {
    setSelected(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />

      <main>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && (
          <MovieGrid movies={movies} onSelect={handleSelect} />
        )}
      </main>

      <MovieModal movie={selected} onClose={handleCloseModal} />
    </div>
  );
}
