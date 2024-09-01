import {usePopularMoviewsQuery} from "../../../../hooks/usePopularMovies"

const Banner = () => {
    const { data } = usePopularMoviewsQuery();
    console.log("data: ", data);
    return (
        <div>
            Banner
        </div>
    )
}

export default Banner