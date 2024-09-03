import { usePopularMoviewsQuery } from "../../../../hooks/usePopularMovies";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviewsQuery();
    console.log("data:", data)
    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
    const popularMovies = data.results.filter(movie => movie.vote_average >= 6);
    const movie = popularMovies[0];

    if (isError) {
        return <Alert variant={'danger'}>{error.message}</Alert>;
    }

    if (!data || !data.results || data.results.length === 0) {
        return <Alert variant={'warning'}>No movie data available</Alert>;
    }

    const imageUrl = `https://www.themoviedb.org/t/p/original${movie.backdrop_path}`;

    return (
        <div style={{ backgroundImage: `url(${imageUrl})` }} className="banner">
            <div className="text-white banner-text-area">
                <h1 className='title'>{data?.results[0].title}</h1>
                <p className='overview'>{data?.results[0].overview}</p>
            </div>
        </div>
    );
}

export default Banner;
