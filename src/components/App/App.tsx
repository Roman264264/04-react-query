import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import ReactPaginate from "react-paginate";
import css from "./App.module.css";
import type { TMDBResponse } from "../../services/movieService";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Movie | null>(null);

  const { data, isFetching, isError } = useQuery<TMDBResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query.trim().length > 0,
    placeholderData: (previousData) => previousData,
  });

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    setQuery(value);
    setPage(1);
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
        {isFetching && <Loader />}
        {isError && <ErrorMessage />}

        {!isFetching && !isError && data?.results && (
          <MovieGrid movies={data.results} onSelect={handleSelect} />
        )}
      </main>

      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      <MovieModal movie={selected} onClose={handleCloseModal} />
    </div>
  );
}
