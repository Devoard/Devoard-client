import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import Title from "../components/common/Title";
import ChatDetail from "./ChatDetail";
import { setActivePage } from "../modules/user";
import { chat_list, set_user } from "../modules/chat";

// const Wrap = styled.div`
//   width: 100%;
//   height: 90vh;
//   position: relative;
// `;
const ListBox = styled.div`
  width: 65%;
  min-height: 680px;
  margin: 30px auto;
`;
const ChatItem = styled.div`
  font-size: 20px;
  display: flex;
  color: ${(props) => (props.isRead ? "#A0A0A0;" : "var(--color-orange)")};
  border-bottom: 1px solid #fff;
  padding: 10px 8px;
  margin-bottom: 12px;
  cursor: pointer;
  z-index: 400;
  &:before {
    content: "ㅁ";
    color: #fff;
    margin-right: 10px;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
const FromId = styled.p`
  width: 20%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;
const Content = styled.p`
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 26px;
  margin: 0;
`;
const Date = styled.p`
  width: 20%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;
const PageControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlBtn = styled.button`
  color: #fff;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #ddd;
  }
`;
const ChatList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const page_num = 5; //페이지 숫자 개수 ◀ 1 2 3 ▶
  const message_num = 12; //한페이지에 보여질 쪽지수
  const [allChat, setAllChat] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(setActivePage("chat"));
  }, [setActivePage]);

  useEffect(() => {
    if (page > 0) {
      for (let i = 1; i <= page; i++) {
        setPages((prev) => prev.concat([i]));
        if (i >= page_num) return;
      }
    }
  }, [page]);

  useEffect(() => {
    if (loggedUser.id && !detailOpen) {
      get_list();
    }
  }, [loggedUser.id, detailOpen]);

  const get_list = () => {
    const body = {
      user: loggedUser.id,
    };
    dispatch(chat_list(body)).then((res) => {
      setAllChat(res.payload);
      setPage(Math.ceil(res.payload.length / message_num));
    });
  };

  const onPageChange = (e) => {
    setCurrentPage(e.target.innerHTML);
  };

  const onPrev = () => {
    if (pages[0] === 1) return;
    let arr = [];
    let i = pages[pages.length - 1] - pages.length;
    while (arr.length < page_num) {
      arr.push(i);
      i--;
    }
    setPages(arr.reverse());
  };

  const onNext = () => {
    if (pages[pages.length - 1] >= page) return;
    let arr = [];
    for (let i = pages[pages.length - 1] + 1; i <= page; i++) {
      if (arr.length < page_num) arr.push(i);
    }
    setPages(arr);
  };

  const onDetailClick = (e) => {
    const from_user = e.target.getAttribute("data-from");
    setDetailOpen(true);
    dispatch(set_user(from_user));
  };

  return (
    <>
      <Title>쪽지함</Title>
      <ListBox>
        {allChat &&
          allChat.length > 0 &&
          allChat.map((v, i) => {
            if (
              i + 1 > (currentPage - 1) * message_num &&
              i + 1 <= currentPage * message_num
            ) {
              if (v.sender) {
                return (
                  <ChatItem isRead={v.read} key={i}>
                    <FromId data-from={v.sender} onClick={onDetailClick}>
                      {v.sender}
                    </FromId>
                    <Content data-from={v.sender} onClick={onDetailClick}>
                      {v.chat_body}
                    </Content>
                    <Date data-from={v.sender} onClick={onDetailClick}>
                      {moment(v.time_stamp).format("YYYY-MM-DD HH:mm")}
                    </Date>
                  </ChatItem>
                );
              } else {
                return (
                  <ChatItem isRead={v.read} key={i}>
                    <FromId data-from={v.receiver} onClick={onDetailClick}>
                      {v.receiver}
                    </FromId>
                    <Content data-from={v.receiver} onClick={onDetailClick}>
                      {v.chat_body}
                    </Content>
                    <Date data-from={v.receiver} onClick={onDetailClick}>
                      {moment(v.time_stamp).format("YYYY-MM-DD HH:mm")}
                    </Date>
                  </ChatItem>
                );
              }
            } else return "";
          })}
        {allChat.length === 0 && (
          <Content>나눈 대화가 존재하지 않습니다.</Content>
        )}
      </ListBox>
      {allChat && allChat.length > 0 && (
        <PageControl>
          <ControlBtn onClick={onPrev}>◀</ControlBtn>
          {pages.map((v, i) => (
            <ControlBtn key={i} onClick={onPageChange}>
              {v}
            </ControlBtn>
          ))}
          <ControlBtn onClick={onNext}>▶</ControlBtn>
        </PageControl>
      )}
      {detailOpen && (
        <ChatDetail detailOpen={detailOpen} setDetailOpen={setDetailOpen} />
      )}
    </>
  );
};

export default ChatList;
