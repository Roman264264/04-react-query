import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

async function searchAction(
  formData: FormData,
  onSubmit: (query: string) => void
) {
  const query = (formData.get("query") || "").toString().trim();

  if (!query) {
    toast.error("Please enter your search query.");
    return;
  }

  onSubmit(query);
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form
          className={styles.form}
          action={(formData: FormData) => searchAction(formData, onSubmit)}
          method="post"
          aria-label="Search movies form"
        >
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
