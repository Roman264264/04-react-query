import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface FetchMoviesParams {
  query: string;
  page?: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<TMDBResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (!token) {
    throw new Error("VITE_TMDB_TOKEN is not defined");
  }

  const config = {
    params: {
      query,
      page,
      include_adult: false,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${BASE_URL}/search/movie`;
  const response = await axios.get<TMDBResponse>(url, config);
  return response.data;
}

export function getImageUrl(
  path: string | null,
  size: "w500" | "original" = "w500"
) {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
