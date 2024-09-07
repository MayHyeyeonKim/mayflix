import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Dropdown, DropdownButton, Alert } from "react-bootstrap";
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
  const genreId = query.get("genre");

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
    if (genreId === null) {
      setQuery({});
    } else {
      setQuery({ genre: genreId });
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

  const sortedMovies = filteredMovies?.sort((a, b) => {
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
  });

  const renderMovies = (movies) => (
    <Row>
      {movies.map((movie, index) => (
        <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-4">
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container>
    <Row>
      <Col lg={8} xs={12}>
        <Row>
          <Col>
            <DropdownButton id="genre-dropdown" title={selectedGenre} className="genre-dropdown">
              <Dropdown.Item onClick={() => sortByGenre(null, "Genre")}>All</Dropdown.Item>
              {genreData?.map((genre) => (
                <Dropdown.Item key={genre.id} onClick={() => sortByGenre(genre.id, genre.name)}>
                  {genre.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col className="d-flex justify-content-end">
            <DropdownButton id="sort-dropdown" title={selectedSort} onSelect={handleSort} className="sort-dropdown">
              {selectList.map((item, index) => (
                <Dropdown.Item key={index} eventKey={item}>
                  {item}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
  
        <Row className="movie-grid">
          <Col lg={12}>
            {isLoading ? (
              <p>검색 하기</p>
            ) : sortedMovies?.length === 0 ? (
              <>
                <Alert variant="info" className="text-center p-5 mb-4">
                  <h4 className="alert-heading">Sorry, there is no result of your search.</h4>
                  <p className="mb-0">Please try different keywords or check out our popular movies below.</p>
                </Alert>
                <h3 className="text-white mb-4">Popular Movies</h3>
                {renderMovies(data?.results.slice(0, 8) || [])} {/* 인기 영화 8개만 렌더링 */}
              </>
            ) : (
              renderMovies(sortedMovies || []) // 검색된 영화 목록 또는 정렬된 영화 목록 렌더링
            )}
          </Col>
        </Row>
  
        <Row style={{ margin: "20px" }}>
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
        </Row>
      </Col>
    </Row>
  </Container>
  
  );
};

export default MoviePage;