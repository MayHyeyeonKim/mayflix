import Badge from "react-bootstrap/Badge";
import './MovieCard.style.css'
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
const API_KEY = process.env.REACT_APP_API_KEY;

const MovieCard = ({movie}) => {
const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}?api_key=${API_KEY}`;
const { data:genreData } = useMovieGenreQuery()
console.log("ggg: ", genreData)

const showGenre = (genreIdList) => {
    if(!genreData) return []
    const genreNameList = genreIdList.map((id)=>{
        const genreObj = genreData.find((genre)=>genre.id === id)
        return genreObj.name;
    })

    return genreNameList
}
    return (
    <div 
    style={{backgroundImage: "url("+`https://image.tmdb.org/t/p/w500${movie.poster_path}?api_key=${API_KEY}`+")"}}
    className="movie-card">
        <div className="overlay">
        <h2>{movie.title}</h2>
        <div>{showGenre(movie.genre_ids).map((id)=><Badge bg="danger" style={{margin:'2px'}} >{id}</Badge>)}</div>
        <div>
            <div>⭐ Rating: {movie.vote_average}</div>
            <div>🔥 Popularity: {movie.popularity}</div>
            <div>{movie.adult?'Adults Only':'Parental Guidance (PG)'}</div>
        </div>
        </div>
    </div>
    );
}

export default MovieCard;