import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchTopRatedMovies = async() => {
        return await api.get(`/movie/top_rated`)
}

export const useTopRatedMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-top'],
        queryFn: fetchTopRatedMovies,
        select: (result) => result.data,
    })
}