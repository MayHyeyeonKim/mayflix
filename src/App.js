import './App.css';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const AppContainer = styled.div`
  background-color: black;  /* 배경색을 검은색으로 설정 */
  color: white;  /* 텍스트 색상을 흰색으로 설정 */
  min-height: 100vh;  /* 화면 전체 높이를 커버 */
`

//홈페이지
//영화 전체보여주는 페이지(서치) /movies
//영화 디테일 페이지 /movies/:id
//추천 영화 /movies/:id/recommandation
//리뷰 movies/:id/reviews
function App() {
  return (
    <div>
      <AppContainer>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
      </AppContainer>
    </div>
  );
}

export default App;
