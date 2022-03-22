import { darken, lighten } from "polished";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PopUp from "../components/PopUp";
import { submit_chat } from "../modules/chat";
import moment from "moment";
const Form = styled.form`
  width: 90%;
  height: 70%;
`;
const Content = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #acacac;
  border-radius: 20px;
  padding: 22px 16px;
  font-size: 18px;
`;
const Div = styled.div`
  width: 90%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h2``;
const SubmitBtn = styled.button`
  border: none;
  background: var(--color-orange);
  border-radius: 20px;
  height: 30px;
  width: 60px;
  color: #fff;
  cursor: pointer;
`;

const ChatWrite = ({ writeOpen, setWriteOpen }) => {
  const [content, setContent] = useState("");
  const { loggedUser } = useSelector((state) => state.user);
  const { to_user } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const onChange = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    const body = {
      from_user: loggedUser.id,
      content: content,
      to_user: to_user,
      date: moment().format("YYYY-MM-DD HH:mm"),
    };
    console.log("body:", body);
    dispatch(submit_chat(body));
    alert("쪽지를 전송했습니다.");
    setContent("");
  };
  return (
    <PopUp
      width={"60%"}
      height={"80%"}
      isVisible={writeOpen}
      setIsPopUp={setWriteOpen}
    >
      <Div>
        <Title>쪽지 작성</Title>
        <SubmitBtn onClick={onSubmit}>전송</SubmitBtn>
      </Div>
      <Form>
        <Content value={content} onChange={onChange} />
      </Form>
    </PopUp>
  );
};

export default ChatWrite;
