import React from "react";
import styled from "styled-components";
import PopUp from "../common/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { useProject } from "../hooks/useProject";
import { getApplyProject } from "../../modules/project";

const Name = styled.h3`
  border-bottom: 1px solid #000;
  width: 100%;
  padding: 6px;
`;

const Wrap = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DescTitle = styled.h3`
  font-size: 16px;
`;

const Tag = styled.span`
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 20px;
  color: #fff;
  margin: 2px;
  background: ${(props) => props.theme.palette.gray};
`;

const Button = styled.button`
  margin: 80px 20px 0;
  padding: 4px 18px;
  border-radius: 20px;
  cursor: pointer;
  border: ${(props) => (props.accept ? "none" : "1px solid #000")};
  outline: none;
  background: ${(props) => (props.accept ? "var(--color-orange)" : "#fff")};
  color: ${(props) => (props.accept ? "#fff" : "#000")};
`;

const ApplyProjectPopUp = ({
  detailOpen,
  setDetailOpen,
  awaiter,
  importArr,
  projectId,
}) => {
  const dispatch = useDispatch();
  const { acceptAwaiter, rejectAwaiter } = useProject();
  const { loggedUser } = useSelector((state) => state.user);

  const onAccept = () => {
    if (window.confirm("수락하시겠습니까?")) {
      acceptAwaiter(loggedUser.id, projectId, awaiter.username);
      dispatch(
        getApplyProject({
          username: loggedUser.id,
        })
      );
      setDetailOpen(false);
    }
  };

  const onReject = () => {
    if (window.confirm("거절하시겠습니까?")) {
      rejectAwaiter(loggedUser.id, projectId, awaiter.username);
      dispatch(
        getApplyProject({
          username: loggedUser.id,
        })
      );
      setDetailOpen(false);
    }
  };

  return (
    <>
      <PopUp
        width={"50%"}
        height={"60%"}
        isVisible={detailOpen}
        setIsPopUp={setDetailOpen}
      >
        <Name>{awaiter.username}</Name>
        <Wrap>
          <DescTitle>연락처: {awaiter.user_connect}</DescTitle>
          <DescTitle>
            기술스택:
            {awaiter.u_skill.length > 0 &&
              awaiter.u_skill.map((v, i) => (
                <Tag key={i}>{v.user_skill_name}</Tag>
              ))}
          </DescTitle>
          <DescTitle>프로젝트 경험 유/무: {awaiter.user_exp}</DescTitle>
          <DescTitle>
            중요하게 생각하는 요소:
            {importArr.length > 0 &&
              importArr.map((v, i) => <Tag key={i}>{v}</Tag>)}
          </DescTitle>
          <DescTitle>포트폴리오 주소: {awaiter.user_pf_addr}</DescTitle>
          <div>
            <Button accept="true" onClick={onAccept}>
              수락
            </Button>
            <Button onClick={onReject}>거절</Button>
          </div>
        </Wrap>
      </PopUp>
    </>
  );
};

export default ApplyProjectPopUp;
