import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchMovieReview = id => {
    return api.get(`movie/${id}/reviews`)
}

const useMovieReviewQuery = id => {
    return useQuery({
        queryKey: ['movie-review', id],
        queryFn: () => fetchMovieReview(id),
        select: result => {
            return result.data
        }
    })
}

export default useMovieReviewQuery;