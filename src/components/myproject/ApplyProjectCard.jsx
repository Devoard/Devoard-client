import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getApplyProject } from "../../modules/project";
import ApplyProjectPopUp from "./ApplyProjectPopUp";
const Wrap = styled.div`
  background: #fff;
  width: 20%;
  border-radius: 20px;
  height: 330px;
  display: inline-block;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
`;

const Title = styled.h3`
  border-bottom: 1px solid #000;
  margin: 0;
`;
const Subtitle = styled.h5`
  font-size: 16px;
  margin: 0;
`;
const Desc = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;
const TagDiv = styled.div`
  overflow: hidden;
  white-space: nowrap;
`;
const Tag = styled.span`
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 20px;
  color: #fff;
  margin: 2px;
  background: ${(props) => props.theme.palette.gray};
`;

const ApplyProjectCard = ({ awaiter, projectId }) => {
  const dispatch = useDispatch();

  const importArr = awaiter.user_import.split(",");

  const [detailOpen, setDetailOpen] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!detailOpen) {
      dispatch(getApplyProject({ username: loggedUser.id }));
    }
  }, [detailOpen]);

  const onDetail = () => {
    setDetailOpen(true);
  };

  return (
    <>
      <Wrap onClick={onDetail}>
        <Title>{awaiter.username}</Title>
        <Desc>
          <Subtitle>다룰 수 있는 기술 스택</Subtitle>
          <TagDiv>
            {awaiter.u_skill.length > 0 &&
              awaiter.u_skill.map((v, i) => (
                <Tag key={i}>{v.user_skill_name}</Tag>
              ))}
          </TagDiv>
          <Subtitle>팀 프로젝트 경험 유무</Subtitle>
          <Tag>{awaiter.user_exp}</Tag>
          <Subtitle>중요하게 생각하는 요소</Subtitle>
          <TagDiv>
            {importArr.map((v, i) => (
              <Tag key={i}>{v}</Tag>
            ))}
          </TagDiv>
        </Desc>
      </Wrap>

      {detailOpen && (
        <ApplyProjectPopUp
          detailOpen={detailOpen}
          setDetailOpen={setDetailOpen}
          awaiter={awaiter}
          projectId={projectId}
          importArr={importArr}
        />
      )}
    </>
  );
};

export default ApplyProjectCard;
