import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchUpcomingMovies = async ()=>{
        return await api.get('movie/upcoming');
};

export const useUpcomingMoviesQuery = () => {
    return useQuery({
        queryKey: ['upcomingMovies'],
        queryFn: fetchUpcomingMovies,
        select: (result) => result.data,
    })
}