//배너 => popular영화를 들고와서 젤 첫 아이템 보여줘
//popular movie
//top rated movie
//upcoming movie

import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMoviesSlide/UpcomingMoviesSlide";

const Homepage = () => {
    return (
        <h1>
            <div>
            <Banner/>
            <PopularMovieSlide />
            <TopRatedMovieSlide />
            <UpcomingMovieSlide />
            </div>
        </h1>
    )
}

export default Homepage;