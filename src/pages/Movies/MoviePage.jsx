import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";

//경로 2가지
// nav바에서 클릭해서 온 경우 -> popularMovie
// keyword를 입력해서 온 경우 -> keyword와 관련된 영화들을 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할 때마다 페이지 바꿔주기
//page값 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch

import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import MovieCard from "../../common/MovieCard/MovieCard";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1)
  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const handlePageClick = ({selected}) => {
    setPage(selected+1)
  };
  console.log("여기는 MoviePage의 data", data);
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          {/* 필터 */}
        </Col>
        <Col lg={8} xs={12}>
        <Row>
            {isLoading ? (
              <p>검색 하기</p> // 로딩 중일 때 표시할 메시지
            ) : data && data.results.length === 0 ? (
              <p>검색 결과가 없습니다.</p> // 검색 결과가 없을 때 표시할 메시지
            ) : (
              data?.results.map((movie, index) => (
                <Col key={index} lg={6} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))
            )}
          </Row>
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={6} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
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
        forcePage={page-1}
      />
        </Col>
      </Row>
    </Container>
  );
};
export default MoviePage;
