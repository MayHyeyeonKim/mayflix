import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useMovieDetailQuery from "../../hooks/useMovieDetailQuery";
import { Badge, Button } from "react-bootstrap";
import "./MovieDetailPage.style.css";
import PreviewModal from "./components/PreviewModal";
import useMovieReviewQuery from "../../hooks/useMovieReviewQuery";
import useMovieRecommendations from "../../hooks/useMovieRecommendations"
import MovieSlider from "../../common/MovieSlider/MovieSlider"
import {responsive} from "../../constants/responsive"
const MovieDetailPage = () => {
  const menuList = ["상세정보", "추천", "리뷰"];
  const [expandedIndex, setExpandedIndex] = useState(null); // For tracking the expanded review
  const { id } = useParams();
  const { data, isLoading, error } = useMovieDetailQuery(id);
  const { data: ReviewDatas } = useMovieReviewQuery(id);
  const { data: RecoDatas } = useMovieRecommendations(id);
  const [modalShow, setModalShow] = useState(false);
  const [activeMenu, setActiveMenu] = useState("상세정보");
  const reff = useRef(null);

  console.log("recooooo:", RecoDatas)

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching movie details</p>;

  const handleMenuSelect = (event) => {
    setActiveMenu(event.currentTarget.textContent);
  };

  const handleShowMore = () => {
    reff.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Toggle the expansion of a review
  const handleReview = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle between expanded and collapsed
  };

  return (
    <div>
      <div className="detail-page-container">
        <div className="movie-detail-banner">
          {data.backdrop_path && (
            <img
              src={`https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.backdrop_path}`}
              alt={data.title}
              className="movie-detail-img"
            />
          )}

          <div className="banner-detail-area">
            <h1>{data.title}</h1>
            <div className="movie-detail-info">
              <p>{data.release_date}</p>
              <p>{data.runtime}분</p>
              <div
                className={`movie-age detail-age ${
                  data.adult ? "adult" : "all"
                }`}
              ></div>
            </div>
            <div className="movie-genre">
              {data.genres.map((genre) => (
                <Badge
                  key={genre.id}
                  bg="warning"
                  text="dark"
                  className="movie-genre"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="play-button">
              <Button variant="danger" onClick={() => setModalShow(true)}>
                예고편 보기<span className="btn-play"> ▶</span>
              </Button>
            </div>
            <p className="overview">
              {data.overview.length < 100
                ? data.overview
                : `${data.overview.slice(0, 100)}...`}
              {data.overview.length > 100 && (
                <Button
                  variant="link"
                  className="show-more-button"
                  onClick={handleShowMore}
                >
                  더보기
                </Button>
              )}
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bottom-contents">
          <div>Reviews</div>
          {ReviewDatas?.results?.map((result, index) => (
              <div className="accordion" >
              <div className={expandedIndex === index ? "accodion-inside2": "accodion-inside1"}> {result.content},{result.author}</div>
                  <button onClick={() => handleReview(index)} className="accordion-btn">{expandedIndex === index ? "Show Less" : "Read More"}</button>
              </div>
          ))}
        </div>

        <div className="slider-style">
  {RecoDatas?.results ? (
    <MovieSlider movies={RecoDatas.results} title="recommend" responsive={responsive}/>
  ) : (
    <p>No recommendations available.</p> // 데이터가 없을 경우 메시지 표시
  )}
</div>


      </div>
      {modalShow && <PreviewModal id={id} setModalShow={setModalShow} />}
    </div>
  );
};

export default MovieDetailPage;
