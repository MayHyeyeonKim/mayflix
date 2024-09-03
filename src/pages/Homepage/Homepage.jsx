//배너 => popular영화를 들고와서 젤 첫 아이템 보여줘
//popular movie
//top rated movie
//upcoming movie

import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";

const Homepage = () => {
    return (
        <h1>
            <div>
            <Banner/>
            <PopularMovieSlide/>
            </div>
        </h1>
    )
}

export default Homepage;