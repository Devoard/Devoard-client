import React, { useState } from "react";
import styled from "styled-components";
import AlertDetailPopUp from "./AlertDetailPopUp";

const Wrap = styled.div`
  width: 100%;
  font-size: 18px;
  border-bottom: 1px solid #acacac;
  margin: 30px 0;
  cursor: pointer;
`;

const Info = styled.span`
  ${(props) => props.active && `color: var(--color-orange)`};
`;

const Content = styled.p`
  margin: 20px 0 10px;
`;

const AlertItem = ({ alert }) => {
  const [openDetail, setOpenDetail] = useState(false);
  return (
    <Wrap
      onClick={() => {
        setOpenDetail((prev) => !prev);
      }}
    >
      <Info>신청하신</Info>
      <Info active={true}>{`[${alert.devoard_data}]`}</Info>
      {/* <Info active={true}>{`[프로그램명]`}</Info> */}
      <Info>에 대한 알림입니다.</Info>
      <Content>{alert.data}</Content>
      {/* <Content>ㅁㄴㅇㄹ</Content> */}
      {openDetail && (
        <AlertDetailPopUp
          alertId={alert.id}
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
        />
      )}
    </Wrap>
  );
};

export default AlertItem;
