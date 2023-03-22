import axios from "axios";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

const API_KEY = "c9a17520eccf6435b382b52348836e16";
const BASE_URL = "https://api.themoviedb.org/3";

const getTrending = () =>
  axios
    .get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    .then((res) => res.data);

const getUpcoming = () =>
  axios
    .get(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    )
    .then((res) => res.data);
const getNowPlaying = () =>
  axios
    .get(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    )
    .then((res) => res.data);

export const moviesApi = { getTrending, getUpcoming, getNowPlaying };
