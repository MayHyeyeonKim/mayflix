import React from 'react';
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// Styled Components를 사용하여 스타일링
const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-height: 90vh;  /* 최대 높이를 화면 높이에 맞추기 */
  width: 100vw;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.main};  
  background-color: ${({ theme }) => theme.colors.background};  
  overflow: auto;  /* 스크롤 허용 */
  padding: 10px;  /* 패딩 추가 */
  box-sizing: border-box;  /* 전체 박스 크기를 포함 */
`;

const OverlayBox = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.overlay};  
  padding: 10px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text};  
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 0.75rem 1.5rem;  /* 통통한 모양을 위해 추가적인 패딩 */
  font-size: 1.2rem;
  border-radius: 30px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <StyledContainer>
            {/* 이미지 컨테이너 */}
            <div style={{ width: "70%", textAlign: 'center' }}>
                <img src='/images/404.jpg' alt="404 Not Found" style={{ maxWidth: '50%', height: 'auto' }} />
            </div>

            {/* 텍스트와 버튼 컨테이너 */}
            <OverlayBox>
                <h2 style={{ fontWeight: '700' }}>Lost your way?</h2>
                <p>Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
                <StyledButton variant="primary" onClick={()=>{navigate('/')}}>Mayflix Home</StyledButton>{' '}
                <div style={{ marginTop: '20px' }}>
                    Error Code <strong>404</strong>
                </div>
            </OverlayBox>
        </StyledContainer>
    );
}

export default NotFoundPage;
