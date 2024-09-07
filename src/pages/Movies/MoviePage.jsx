import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";

import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("Genre")
  const [selectedSort, setSelectedSort] = useState("Most Popular")

  const keyword = query.get("q");
  const genreId = query.get("genre")

  const selectList = ["Most Popular", "Least Popular", "Latest", "Alphabetical"];

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    genreId
  });

  const {data:genreData} = useMovieGenreQuery();

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSort = (evnetKey) => {
    setSelectedSort(evnetKey);
    setPage(1);
  }

  const sortByGenre = (genreId, genreName) => {
    console.log("여기는 장르");
    const currentQuery = Object.fromEntries([...query]); // 현재 쿼리 파라미터를 가져옴
    
    if (genreId === null) {
      // 장르 필터 제거 (삭제)
      const { genre, ...updatedQuery } = currentQuery;
      setQuery(updatedQuery); // genre 파라미터를 제거한 새로운 쿼리 설정
    } else {
      setQuery({ ...currentQuery, genre: genreId }); // 기존 쿼리 유지하면서 genre 파라미터 추가
    }
  
    setSelectedGenre(genreName);
    setPage(1);
  };
  

  useEffect(()=>{
    setPage(1)
  },[keyword, genreId])

  const filteredMovies = genreId 
  ? data?.results?.filter((movie) => movie.genre_ids.includes(parseInt(genreId, 10))) 
  : data?.results;

  const sortedMovies = filteredMovies?.sort((a,b)=>{
    switch (selectedSort) {
      case "Most Popular":
        return b.popularity - a.popularity;
      case "Least Popular":
        return a.popularity - b.popularity;
      case "Latest":
        return new Date(b.release_date) - new Date(a.release_date);
      case "Alphabetical":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  })

  return (
    <Container>
      <Row>
        <Col lg={8} xs={12}>
          <Row>

            <Col>
            <DropdownButton id="genre-dropdown" title={selectedGenre} className="genre-dropdown">
            <Dropdown.Item onClick={()=>sortByGenre(null, "Genre")}>
                All
            </Dropdown.Item>
            {genreData?.map((genre)=>(
              <Dropdown.Item key={genre.id} onClick={()=>sortByGenre(genre.id, genre.name)}>
                {genre.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
            </Col>
            <Col>
            <DropdownButton id="sort-dropdown" title={selectedSort} onSelect={handleSort} className="sort-dropdown">
            {selectList.map((item, index)=>(
              <Dropdown.Item key={index} eventKey={item}>
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          </Col>

          </Row>
          <Row className="g-0 custom-row"> 
            {isLoading ? (
              <p>검색 하기</p> 
            ) : data && data.results.length === 0 ? (
              <p>검색 결과가 없습니다.</p> 
            ) : (
              data?.results.map((movie, index) => (
                <Col key={index} lg={3} md={6} xs={12}>
                    <MovieCard movie={movie} />
                </Col>
              ))
            )}
          </Row>


          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;