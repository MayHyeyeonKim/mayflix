import './App.css';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Moives/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

//홈페이지
//영화 전체보여주는 페이지(서치) /movies
//영화 디테일 페이지 /movies/:id
//추천 영화 /movies/:id/recommandation
//리뷰 movies/:id/reviews
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        {/* user 화면 */}
          <Route index element={<Homepage/>}/>
          <Route path="movies">
            <Route index element={<MoviePage/>}/>
            <Route path=":id" element={<MovieDetailPage/>}/>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
