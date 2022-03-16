import React from "react";
import styled from "styled-components";
import { TiHeartOutline, TiHeartFullOutline } from "react-icons/ti";
const Wrap = styled.div`
  background: #fff;
  width: 23%;
  border-radius: 20px;
  height: 330px;
  display: inline-block;
  margin: 10px;
  padding: 12px;
  box-sizing: border-box;
  overflow: hidden;
`;
const RecruitState = styled.span`
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.palette.orange : props.theme.palette.gray};
  border-radius: 10px;
  padding: 4px 12px;
  color: ${(props) =>
    props.active ? props.theme.palette.orange : props.theme.palette.gray};
`;
const OutlineHeart = styled(TiHeartOutline)`
  color: red;
  font-size: 24px;
`;
const FullHeart = styled(TiHeartFullOutline)`
  color: red;
  font-size: 24px;
`;
const Title = styled.h3`
  border-bottom: 1px solid ${(props) => props.theme.palette.gray};
  margin: 0;
  padding-bottom: 4px;
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
const MakedProjectCard = ({
  title,
  description,
  isLike,
  isRecruiting,
  tags,
}) => {
  return (
    <Wrap>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <RecruitState active={isRecruiting ? true : false}>
          {isRecruiting ? "모집중" : "마감"}
        </RecruitState>
        {isLike ? <FullHeart /> : <OutlineHeart />}
      </div>
      <Title>{title}</Title>
      {tags && tags.length > 0 && tags.map((v, i) => <Tag key={i}>{v}</Tag>)}
      <Desc>{description}</Desc>
    </Wrap>
  );
};

export default MakedProjectCard;
