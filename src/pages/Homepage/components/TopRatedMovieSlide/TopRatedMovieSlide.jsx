import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies"; // 오타 수정
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../MovieCard/MovieCard';
import './TopRatedMovie.style.css';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

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
            <h3>Top Rated Movies</h3>
            <Carousel
            infinite={true}
            centerMode={true}
            itemClass="movie-slider p-1"
            containerClass="carousel-container"
            responsive={responsive}
            >
                {data.map((movie, index) => (<MovieCard movie={movie} key={index} />))}
            </Carousel>
        </div>
    )
}

export default TopRatedMovieSlide;