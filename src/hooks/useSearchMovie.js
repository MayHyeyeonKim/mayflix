import { useQuery } from "@tanstack/react-query"
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, genreId }) => {
    if (keyword) {
      return api.get(`/search/movie?query=${keyword}&page=${page}${genreId ? `&with_genres=${genreId}` : ''}`);
    }
    return api.get(`/movie/popular?page=${page}${genreId ? `&with_genres=${genreId}` : ''}`);
  };
  
  export const useSearchMovieQuery = ({ keyword, page, genreId }) => {
    return useQuery({
      queryKey: ['movie-search', keyword, page, genreId],
      queryFn: () => fetchSearchMovie({ keyword, page, genreId }), // 객체로 전달된 값을 사용
      select: (result) => result.data,
    });
  };
  