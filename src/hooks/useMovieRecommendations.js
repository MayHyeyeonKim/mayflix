import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchRecommendationsMovies = async id => {
        return await api.get(`/movie/${id}/recommendations`)
}

export const useRecommendationsQuery = (id) => {
    return useQuery({
        queryKey: ['movie-Recommendations',id],
        queryFn:()=>fetchRecommendationsMovies(id),
        select: (result) => result.data,
    })
};

export default useRecommendationsQuery;