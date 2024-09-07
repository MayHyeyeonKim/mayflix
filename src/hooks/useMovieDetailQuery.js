import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchMovieDetail = id => {
    console.log('Fetching movie details for ID:', id);
    return api.get(`movie/${id}?`).then(res => {
        console.log("API res: ", res)
        return res
    })
}

const useMovieDetailQuery = id => {
    return useQuery({
        queryKey: ['movie-detail', id],
        queryFn: () => fetchMovieDetail(id),
        select: result => {
            console.log('Result from API - result:', result); //위에서 받아온 res랑 똑같고
            console.log('Result from API - result.data:', result.data); //res.data로 선택

            return result.data
        }
        // enabled: !!id,  // movieId가 있을 때만 쿼리 실행
    })
}

export default useMovieDetailQuery;