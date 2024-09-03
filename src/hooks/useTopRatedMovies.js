import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchTopRatedMovies = async() => {
    try{
        const res = await api.get(`/movie/top_rated`)
        console.log("TopRatedMovies: ", res.data)
        return res.data
    }catch(error){
        console.error('Fetching top rated movies Error', error)
        throw error;
    }
}

export const useTopRatedMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-top'],
        queryFn: fetchTopRatedMovies,
        select: (data) => data.results
    })
}