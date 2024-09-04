import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchPopularMovies = async() =>{
        return await api.get(`/movie/popular`)
}

export const usePopularMoviewsQuery = () => {
    return useQuery({
        queryKey: ['movie-popular'],
        queryFn:fetchPopularMovies,
        select: (result) => result.data,
    })
};