import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import PopUp from "../components/common/PopUp";
import WriteBtn from "../components/Write/WriteBtn";
import { chatDetailList } from "../modules/chat";
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
  const { to_user } = useSelector((state) => state.chat);
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [detailChat, setDetailChat] = useState([]);
  useEffect(() => {
    if (to_user) {
      const body = {
        to_user: to_user,
        from_user: loggedUser.id,
        loggedUser: loggedUser.id,
      };
      dispatch(chatDetailList(body)).then((res) => {
        setDetailChat(res.payload);
      });
    }
  }, [to_user]);

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
          {detailChat &&
            detailChat.length > 0 &&
            detailChat.map((v, i) => {
              if (v.sender) {
                return (
                  <ChatItem
                    key={i}
                    desc={"받은 쪽지"}
                    date={moment(v.time_stamp).format("YYYY-MM-DD HH:mm")}
                  >
                    <Content>{v.chat_body}</Content>
                  </ChatItem>
                );
              } else {
                return (
                  <ChatItem
                    key={i}
                    desc={"보낸 쪽지"}
                    date={moment(v.time_stamp).format("YYYY-MM-DD HH:mm")}
                  >
                    <Content>{v.chat_body}</Content>
                  </ChatItem>
                );
              }
            })}
        </ListBox>
      </PopUp>
      {writeOpen && (
        <ChatWrite
          writeOpen={writeOpen}
          setWriteOpen={setWriteOpen}
          setDetailOpen={setDetailOpen}
        />
      )}
    </>
  );
};

export default ChatDetail;
