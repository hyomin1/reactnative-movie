import axios from "axios";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

const API_KEY = "c9a17520eccf6435b382b52348836e16";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}
export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const moviesApi = {
  getTrending: () => {
    return axios
      .get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => res.data);
  },
  getUpcoming: () => {
    return axios
      .get(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
      .then((res) => res.data);
  },
  getNowPlaying: () => {
    return axios
      .get(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
      .then((res) => res.data);
  },
  search: ({ queryKey }) => {
    const [_, query] = queryKey;

    return axios
      .get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
      )
      .then((res) => res.data);
  },
};
export const tvApi = {
  getTrending: () => {
    return axios
      .get(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`)
      .then((res) => res.data);
  },
  airingToday: () => {
    return axios
      .get(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`)
      .then((res) => res.data);
  },
  topRated: () => {
    return axios
      .get(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`)
      .then((res) => res.data);
  },
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return axios
      .get(
        `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
      )
      .then((res) => res.data);
  },
};
