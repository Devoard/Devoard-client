import React from "react";
import styled from "styled-components";
// import { TiHeartOutline, TiHeartFullOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
const Wrap = styled.div`
  background: #fff;
  width: 23%;
  border-radius: 20px;
  height: 330px;
  display: inline-block;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
`;
const RecruitState = styled.span`
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.palette.orange : props.theme.palette.gray};
  border-radius: 10px;
  padding: 2px 12px;
  color: ${(props) =>
    props.active ? props.theme.palette.orange : props.theme.palette.gray};
`;
// const OutlineHeart = styled(TiHeartOutline)`
//   color: red;
//   font-size: 24px;
// `;
// const FullHeart = styled(TiHeartFullOutline)`
//   color: red;
//   font-size: 24px;
// `;
const Title = styled.h3`
  border-bottom: 1px solid ${(props) => props.theme.palette.gray};
  margin: 0;
  margin-bottom: 10px;
  padding-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Desc = styled.p`
  width: 100%;
  font-size: 18px;
  margin: 6px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 12em;
`;
const Tag = styled.span`
  padding: 4px 10px;
  border-radius: 10px;
  background: ${(props) => props.theme.palette.gray};
  color: #fff;
  font-size: 14px;
  margin-right: 6px;
`;
const MakedProjectCard = ({ project }) => {
  const fieldArr = project.field.split(",");
  const navigate = useNavigate();
  const onDetail = () => {
    navigate(`/devoard/detail/${project.id}`);
  };

  return (
    <Wrap onClick={onDetail}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <RecruitState active={project.done === "진행중" ? true : false}>
          {project.done}
        </RecruitState>
        {/* {isLike ? <FullHeart /> : <OutlineHeart />} */}
      </div>
      <Title>{project.title}</Title>
      {fieldArr &&
        fieldArr.length > 0 &&
        fieldArr.map((v, i) => <Tag key={i}>{v}</Tag>)}
      <Desc>{project.body}</Desc>
    </Wrap>
  );
};

export default MakedProjectCard;
