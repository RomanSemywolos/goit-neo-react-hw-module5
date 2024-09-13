// movieApi.js

import axios from "axios";

// Ваш API токен
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2I1YmY0M2M2NTllZGQzN2EyNGM0ZGM4MTYwYTY4YiIsIm5iZiI6MTcyNjE4NTY1My42NDcxNTEsInN1YiI6IjY2ZTM3ZDE5MjgwNDhkOTJkZWY5MzAzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WywC6UfZd1uNVdCknrsA8ClxcEjvrGG8LFV2vuLVe70";

// Налаштування axios
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json;charset=utf-8";

// Отримання популярних фільмів
const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get("/trending/movie/day");
    return data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};

// Пошук фільмів за назвою
const searchMoviesByName = async (query) => {
  try {
    const { data } = await axios.get(`/search/movie?query=${query}`);
    return data;
  } catch (error) {
    console.error("Error searching movies:", error);
  }
};

// Отримання фільму за ID
const fetchMovieById = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

// Отримання рецензій на фільм за ID
const fetchMovieReviews = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/reviews`);
    return data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
  }
};

// Отримання акторського складу фільму за ID
const fetchMovieCast = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/credits`);
    return data;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
  }
};

export {
  fetchTrendingMovies,
  searchMoviesByName,
  fetchMovieById,
  fetchMovieReviews,
  fetchMovieCast,
};
