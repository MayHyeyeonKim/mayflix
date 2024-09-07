import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchPreviewMovies = async({id}) =>{
        return await api.get(`/movie/${id}/videos`)
}

export const usePreviewQuery = ({id}) => {
    return useQuery({
        queryKey: ['movie-preview',id],
        queryFn:()=>fetchPreviewMovies({id}),
        select: (result) => result.data,
    })
};