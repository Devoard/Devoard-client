import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MakedProjectCard from "../components/MakedProjectCard";
import { setActivePage } from "../modules/user";

const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-family: var(--font-title);
`;
const Menu = styled.div`
  display: flex;
  justify-content: center;
`;
const MenuItem = styled.p`
  color: ${(props) => (props.active ? "#fff" : props.theme.palette.gray)};
  cursor: pointer;
  margin: 0 10px;
  &:nth-child(2) {
    &::before {
      content: "|";
      margin-right: 20px;
      color: ${(props) => props.theme.palette.gray};
    }
    &::after {
      content: "|";
      margin-left: 20px;
      color: ${(props) => props.theme.palette.gray};
    }
  }
`;
const ContentBox = styled.div`
  width: 100%;
  margin: 30px 0;
  text-align: center;
`;
const MyProject = () => {
  const dispatch = useDispatch();
  const { projectList } = useSelector((state) => state.project);
  const [clickMenu, setClickMenu] = useState("내가 소속된 프로젝트");
  useEffect(() => {
    dispatch(setActivePage("my_project"));
  }, [setActivePage]);
  const onMenuClick = (e) => {
    setClickMenu(e.target.innerHTML);
  };
  const isActive = (value) => {
    if (value === clickMenu) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Title>나의 프로젝트</Title>
      <Menu>
        <MenuItem
          active={isActive("내가 소속된 프로젝트")}
          onClick={onMenuClick}
        >
          내가 소속된 프로젝트
        </MenuItem>
        <MenuItem
          active={isActive("내가 구성한 프로젝트")}
          onClick={onMenuClick}
        >
          내가 구성한 프로젝트
        </MenuItem>
        <MenuItem
          active={isActive("나의 프로젝트 지원 현황")}
          onClick={onMenuClick}
        >
          나의 프로젝트 지원 현황
        </MenuItem>
      </Menu>
      <ContentBox>
        {clickMenu === "내가 구성한 프로젝트" &&
          projectList.length > 0 &&
          projectList.map((v, i) => (
            <MakedProjectCard
              key={i}
              title={v.title}
              isLike={v.isLike}
              tags={v.tags}
              description={v.description}
              isRecruiting={v.isRecruiting}
            />
          ))}
      </ContentBox>
    </>
  );
};

export default MyProject;
