import { usePopularMoviewsQuery } from "../../../../hooks/usePopularMovies";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';
import { useEffect, useState } from "react";

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviewsQuery();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // 데이터가 없는 경우 기본 이미지 설정 또는 `poster_path` 존재 확인
    const posterPath = data.results[0].poster_path ? data.results[0].poster_path : "";
    const bannerImage = posterPath
        ? (isMobile
            ? `url(https://media.themoviedb.org/t/p/w300${posterPath})`
            : `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2${posterPath})`)
        : 'url(/path/to/default-image.jpg)'; // 기본 이미지 URL

    return (
        <div style={{ backgroundImage: bannerImage }} className="banner">
            <div className="text-white banner-text-area">
                <h1 className='title'>{data.results[0].title}</h1>
                <p className='overview'>{data.results[0].overview}</p>
            </div>
        </div>
    );
}

export default Banner;
