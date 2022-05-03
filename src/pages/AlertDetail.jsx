import React from "react";
import styled from "styled-components";
import PopUp from "../components/common/PopUp";
const Content = styled.div`
  overflow-y: auto;
  height: 80%;
  width: 88%;
`;
const Title = styled.h4`
  margin: 30px 0 60px;
  font-size: 24px;
`;
const Info = styled.p`
  margin: 10px 0;
`;

const AlertDetail = ({ detailOpen, setDetailOpen }) => {
  return (
    <PopUp
      width={"50%"}
      height={"70%"}
      isVisible={detailOpen}
      setIsPopUp={setDetailOpen}
    >
      <Content>
        <Title>알림 제목</Title>
        <Info>내용알림 </Info>
        <Info>연락처:</Info>
        <Info>Github 주소:</Info>
      </Content>
    </PopUp>
  );
};

export default AlertDetail;
