import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import { Alert } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import './TopRatedMovie.style.css';
import {responsive} from "../../../../constants/responsive"
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const TopRatedMovieSlide = () => {
    const { data, isLoading, isError, error } = useTopRatedMoviesQuery(); 
    if(isLoading){
        return (
            <h1> Loading...</h1>
        );
    }

    if(isError){
        return(
            <h1>
                <Alert varient="danger">{error.message}</Alert>
            </h1>
        )
    }

    return (
        <div className="top-rated-movie-slide-div">
            <MovieSlider title="Top Rated Movies" movies={data.results} responsive={responsive} />
        </div>
    );
}

export default TopRatedMovieSlide;