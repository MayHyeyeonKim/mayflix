import { usePopularMoviewsQuery } from "../../../../hooks/usePopularMovies";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';
import { useEffect, useState } from "react";

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviewsQuery();
    // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsMobile(window.innerWidth < 768);
    //     };
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    // 로딩 상태일 때 로딩 스피너를 표시
    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
    const popularMovies = data.results.filter(movie => movie.vote_average >= 6);
    const movie = popularMovies[0];

    // 에러 상태일 때 에러 메시지를 표시
    if (isError) {
        return <Alert variant={'danger'}>{error.message}</Alert>;
    }

    // 데이터가 없을 경우에 대한 처리 추가
    if (!data || !data.results || data.results.length === 0) {
        return <Alert variant={'warning'}>No movie data available</Alert>;
    }

    // 모바일 또는 데스크톱에 맞는 배너 이미지 설정
    // const bannerImage = isMobile
    //     ? `url(https://media.themoviedb.org/t/p/w300${data?.results[0].poster_path})`
    //     : `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[0].poster_path})`;
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
