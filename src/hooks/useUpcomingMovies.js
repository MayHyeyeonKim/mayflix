import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchUpcomingMovies = async ()=>{
    try{
        const res = await api.get('movie/upcoming');
        console.log("upcoming res는? ", res.data );
        return res.data
    }catch(error){
        console.error("Fetching upcoming movies Error", error);
        throw error;
    }
};

export const useUpcomingMoviesQuery = () => {
    return useQuery({
        queryKey: ['upcomingMovies'],
        queryFn: fetchUpcomingMovies,
        select: (data) => data.results,
    })
}