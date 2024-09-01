import {usePopularMoviewsQuery} from "../../../../hooks/usePopularMovies"
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css'
import { useEffect, useState } from "react";

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviewsQuery();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    console.log("data: ", data);

    useEffect(()=>{
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])

    if(isLoading){
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
      </Spinner>
    }
    if(isError){
        <Alert variant={'danger'}> {error.message} </Alert>
    }

    const bannerImage = isMobile
    ? `url(https://media.themoviedb.org/t/p/w300${data?.results[0].poster_path})`
    : `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[0].poster_path})`;

    return (
        <div style={{backgroundImage: bannerImage }} className="banner">
            <div className="text-white banner-text-area">
                <h1 className='title'>{data?.results[0].title}</h1>
                <p className='overview'>{data?.results[0].overview}</p>
            </div>
        </div>
    )
}

export default Banner