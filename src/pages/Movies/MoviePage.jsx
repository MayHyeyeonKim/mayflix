import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";

import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import MovieCard from "../../common/MovieCard/MovieCard";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  console.log("여기는 MoviePage의 data", data);

  useEffect(()=>{
    setPage(1)
  },[keyword])

  return (
    <Container>
      <Row>
        <Col lg={8} xs={12}>
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