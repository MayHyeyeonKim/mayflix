import { usePopularMoviewsQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import "react-multi-carousel/lib/styles.css";
import './PopularMovieSlide.style.css'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider'
import {responsive} from "../../../../constants/responsive"


const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviewsQuery();
  if (isLoading) {
    return <h1> Loading... </h1>;
  }
  if (isError) {
    return (
      <h1>
        <Alert varient="danger">{error.message}</Alert>
      </h1>
    );
  }
  return (
    <div className="popular-movie-slide-div">
      <MovieSlider title='Popular Movies' movies={data.results} responsive={responsive}/>
    </div>
  );
};

export default PopularMovieSlide;
