import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PopUp from "../components/PopUp";
import WriteBtn from "../components/WriteBtn";
import ChatWrite from "./ChatWrite";

const ListBox = styled.div`
  overflow: hidden;
  overflow-y: auto;
  height: 80%;
  width: 88%;
`;
const ChatItem = styled.div`
  position: relative;
  width: 100%;
  font-size: 18px;
  border: 1px solid transparent;
  border-bottom: 1px solid #acacac;
  margin: 20px 0;
  &:before {
    content: "${(props) => props.desc}";
    color: ${(props) =>
      props.desc === "보낸 쪽지" ? "var(--color-orange)" : "#6CD370"};
    font-weight: 600;
    display: block;
    position: absolute;
    top: 0;
  }
  &:after {
    content: "${(props) => props.date}";
    position: absolute;
    right: 6px;
    font-size: 16px;
    top: 0;
  }
`;
const Content = styled.p`
  margin: 34px 0 10px;
`;

const ChatDetail = ({ setDetailOpen, detailOpen }) => {
  const [writeOpen, setWriteOpen] = useState(false);
  const dispatch = useDispatch();
  // const {detailChat} = useSelector(state=>state.chat);
  useEffect(() => {
    // dispatch(view_detail_chat(user));
  }, []);
  const onWriteClick = (e) => {
    setWriteOpen(true);
  };
  return (
    <>
      <PopUp
        width={"60%"}
        height={"80%"}
        isVisible={detailOpen}
        setIsPopUp={setDetailOpen}
      >
        <WriteBtn onClick={onWriteClick} />
        <ListBox>
          <ChatItem desc={"받은 쪽지"} date={"2022-02-10 11:19"}>
            <Content>
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
            </Content>
          </ChatItem>
          <ChatItem desc={"보낸 쪽지"} date={"2022-02-10 11:19"}>
            <Content>안녕하세요?</Content>
          </ChatItem>
          <ChatItem desc={"보낸 쪽지"} date={"2022-02-10 11:19"}>
            <Content>안녕하세요?</Content>
          </ChatItem>
          <ChatItem desc={"받은 쪽지"} date={"2022-02-10 11:19"}>
            <Content>안녕하세요?</Content>
          </ChatItem>
          <ChatItem desc={"보낸 쪽지"} date={"2022-02-10 11:19"}>
            <Content>안녕하세요?</Content>
          </ChatItem>
          <ChatItem desc={"받은 쪽지"} date={"2022-02-10 11:19"}>
            <Content>안녕하세요?</Content>
          </ChatItem>
          <ChatItem desc={"보낸 쪽지"} date={"2022-02-10 11:19"}>
            <Content>안녕하세요?</Content>
          </ChatItem>
          <ChatItem desc={"받은 쪽지"} date={"2022-02-10 11:19"}>
            <Content>안녕하세요?</Content>
          </ChatItem>
          <ChatItem desc={"받은 쪽지"} date={"2022-02-10 11:19"}>
            <Content>안녕하세요?</Content>
          </ChatItem>
        </ListBox>
      </PopUp>
      {writeOpen && (
        <ChatWrite writeOpen={writeOpen} setWriteOpen={setWriteOpen} />
      )}
    </>
  );
};

export default ChatDetail;
