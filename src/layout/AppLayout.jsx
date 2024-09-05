import {useState} from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Outlet } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

const StyledNavbarBrand = styled(Navbar.Brand)`
    color: red;
    font-size: 1.8rem;
    font-weight: bold;
    padding-left: 2rem;
    padding-right: 2rem;
    &:hover {
    color: darkred;  /* 마우스 오버 시 색상 변경 */
  }
`
const StyledNavLink = styled(Nav.Link)`
  color: white !important;  /* 텍스트 색상을 흰색으로 설정 */
  padding-right: 2rem !important;;
  &:hover {
    color: lightgray !important;  /* 마우스 오버 시 색상 변경 */
    
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
`;

const StyledFormControl = styled(Form.Control)`
  margin-right: 0.2rem;  /* 기존의 me-2 클래스 대체 */
  flex: 1;  /* 입력 필드가 가능한 최대 공간을 차지하도록 설정 */
  border-radius: 10px;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;  /* 버튼 너비 */
  height: 40px;  /* 버튼 높이 */
  background-color: black !important;  /* 배경색 */
  border: 2px solid red !important;  /* 테두리색 */
  border-radius: 10px;  /* 둥근 모서리 */
  padding: 0;  /* 내부 여백 제거 */
`;

const StyledNavbarToggle = styled(Navbar.Toggle)`
  border-color: red !important; /* 테두리 색상 변경 */
  
  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='red' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }
`;

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()
  const searchByKeyword = (event)=>{
    event.preventDefault()
    navigate(`/movies?q=${keyword}`)
    setKeyword("")
  }
    return (
       <div>
         <Navbar expand="lg" className="px-5 bg-black navbar navbar-expand-lg navbar-light">
          <Container fluid>
            <StyledNavbarBrand href="/"> MayFlix</StyledNavbarBrand>
            <StyledNavbarToggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <StyledNavLink href="/">Home</StyledNavLink>
                <StyledNavLink href="/movies">Movies</StyledNavLink>
              </Nav>

              <StyledForm className="d-flex" onSubmit={searchByKeyword}>
                <StyledFormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value = {keyword}
                  onChange={(event)=> setKeyword(event.target.value)}
                />
                <StyledButton>
                    <FaSearch style={{ color: "red", margin: "0.1rem", fontSize: '1.2rem' }} />
                </StyledButton>
              </StyledForm>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet/>
       </div>
      );
    }

export default AppLayout