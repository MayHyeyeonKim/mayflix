import { usePopularMoviewsQuery } from "../../../../hooks/usePopularMovies";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';
import { useEffect, useState } from "react";

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviewsQuery();

    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    if (isError) {
        return <Alert variant={'danger'}>{error.message}</Alert>;
    }

    if (!data || !data.results || data.results.length === 0) {
        return <Alert variant={'warning'}>No movie data available</Alert>;
    }

    return (
        <div style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[0].poster_path}` }} className="banner">
            <div className="text-white banner-text-area">
                <h1 className='title'>{data?.results[0].title}</h1>
                <p className='overview'>{data?.results[0].overview}</p>
            </div>
        </div>
    );
}

export default Banner;
