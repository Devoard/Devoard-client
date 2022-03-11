import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Title from "../components/Title";
import { setActivePage } from "../modules/user";
import AlertDetail from "./AlertDetail";
const AlertWrap = styled.div`
  width: 100%;
`;
const Wrap = styled.div`
  margin: 0 auto;
  width: 70%;
  height: 700px;
  background-color: #fff;
  border-radius: 0.7rem;
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;
const ListBox = styled.div`
  width: 88%;
  margin: 30px 0;
`;
const AlertItem = styled.div`
  width: 100%;
  font-size: 18px;
  border: 1px solid transparent;
  border-bottom: 1px solid #acacac;
  margin: 30px 0;
  cursor: pointer;
`;
const Info = styled.span`
  &.program {
    color: var(--color-orange);
  }
`;
const Content = styled.p`
  margin: 20px 0 10px;
`;
const Alert = () => {
  const dispatch = useDispatch();
  const [detailOpen, setDetailOpen] = useState(false);
  useEffect(() => {
    dispatch(setActivePage("alert"));
  }, [setActivePage]);

  return (
    <AlertWrap>
      <Title>알림</Title>
      <Wrap>
        <ListBox>
          <AlertItem
            onClick={() => {
              setDetailOpen(true);
            }}
          >
            <Info>신청하신</Info>
            <Info className="program">[프로그램 명]</Info>
            <Info>에 대한 알림입니다.</Info>
            <Content>알림 내용</Content>
          </AlertItem>
        </ListBox>
        {detailOpen && (
          <AlertDetail detailOpen={detailOpen} setDetailOpen={setDetailOpen} />
        )}
      </Wrap>
    </AlertWrap>
  );
};

export default Alert;
