import "./MovieSlider.style.css"
import Carousel from "react-multi-carousel";
import MovieCard from '../MovieCard/MovieCard';
import "react-multi-carousel/lib/styles.css"


const MovieSlider = ({title, movies, responsive}) => {
    return (
        <div>
      <h3 className="movie-slider-title">{title}</h3>
      <Carousel
       infinite={true}
       centerMode={false}
       itemClass="movie-slider"
       containerClass="carousel-container"
       responsive={responsive}
      >
    {movies?.map((movie, index)=><MovieCard movie={movie} key={index}/>)}
      </Carousel>
        </div>

    )
}

export default MovieSlider;