import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import ApplyProjectCard from "./ApplyProjectCard";

const Wrap = styled.div`
  width: 100%;
  height: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProjectTilte = styled.h3`
  text-align: left;
  font-size: 24px;
  color: #fff;
`;
const PrevBtn = styled(MdOutlineNavigateBefore)`
  color: #fff;
  font-size: 42px;
  cursor: pointer;
`;
const NextBtn = styled(MdOutlineNavigateNext)`
  color: #fff;
  font-size: 42px;
  cursor: pointer;
`;
const ApplyProjectComp = ({ project }) => {
  const [skip, setSkip] = useState(0);
  const [awaiterList, setAwaiterList] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = skip; i < project.awaiter.length; i++) {
      if (arr.length < 4) arr.push(project.awaiter[i]);
      if (arr.length > 4) break;
    }
    setAwaiterList(arr);
  }, [skip]);

  const onPrevClick = () => {
    if (skip === 0) return;
    setSkip((prev) => prev - 4);
  };

  const onNextClick = () => {
    if (
      project.awaiter[project.awaiter.length - 1] ===
      awaiterList[awaiterList.length - 1]
    )
      return;
    setSkip((prev) => prev + 4);
  };

  return (
    <>
      <ProjectTilte>{project.project_detail}</ProjectTilte>
      <Wrap>
        <PrevBtn onClick={onPrevClick} />
        {awaiterList &&
          awaiterList.length > 0 &&
          awaiterList.map((v, i) => (
            <ApplyProjectCard key={i} awaiter={v} projectId={project.id} />
          ))}
        <NextBtn onClick={onNextClick} />
      </Wrap>
    </>
  );
};

export default ApplyProjectComp;
