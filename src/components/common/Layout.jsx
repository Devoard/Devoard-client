import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const StyledLayout = styled.div`
  padding: 0 20px;
`;

const Layout = () => {
  return (
    <>
      <Header />
      <StyledLayout>
        <Outlet />
      </StyledLayout>
    </>
  );
}

export default Layout;