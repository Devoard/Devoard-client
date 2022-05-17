import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const StyledLayout = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  max-width: 1280px;
  height: 100vh;
  box-sizing: border-box;
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
};

export default Layout;
