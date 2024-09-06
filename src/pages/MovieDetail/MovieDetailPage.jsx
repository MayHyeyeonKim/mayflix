import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useMovieDetailQuery from "../../hooks/useMovieDetailQuery";
import { Badge, Button } from "react-bootstrap";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  const menuList = ["상세정보", "추천", "리뷰"];
  const { id } = useParams();
  const { data, isLoading, error } = useMovieDetailQuery(id);
  const [modalShow, setModalShow] = useState(false);
  const [activeMenu, setActiveMenu] = useState("상세정보");
  const reff = useRef(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching movie details</p>;

  const handleMenuSelect = (event) => {
    setActiveMenu(event.currentTarget.textContent);
  };

  const handleShowMore = () => {
    reff.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="detail-page-container">
      <div className="movie-detail-banner">
        {data.backdrop_path && (
          <img
            src={`https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.backdrop_path}`}
            alt={data.title}
            // style={{ width: "100%", height: "auto" }}
            className="movie-detail-img"
          />
        )}

        <div className="banner-detail-area">
          <h1>{data.title}</h1>
          <div className="movie-detail-info">
            <p>{data.release_date}</p>
            <p>{data.runtime}분</p>
            <div
              className={`movie-age detail-age ${data.adult ? "adult" : "all"}`}
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

      <div className="bottom-contents">
        <div className="content-nav">
          <ul>
            {menuList.map((menu) => (
              <li key={menu}>
                <button
                  type="button"
                  onClick={handleMenuSelect}
                  className={activeMenu === menu ? "on" : ""}
                >
                  {menu}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
