import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MakedProjectCard from "../components/MyProject/MakedProjectCard";
import { getApplyProject, getJoinList, getMakedList } from "../modules/project";
import { setActivePage } from "../modules/user";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import JoinProjectCard from "../components/MyProject/JoinProjectCard";
import ApplyProjectComp from "../components/MyProject/ApplyProjectComp";

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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List = styled.div`
  width: 90%;
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

const MyProject = () => {
  const dispatch = useDispatch();

  const { projectList } = useSelector((state) => state.project);
  const { loggedUser } = useSelector((state) => state.user);

  const [clickMenu, setClickMenu] = useState("내가 소속된 프로젝트");
  const [skip, setSkip] = useState(0);
  const [makedList, setMakedList] = useState([]);
  const [joinList, setJoinList] = useState([]);
  const [applyList, setApplyList] = useState([]);

  useEffect(() => {
    dispatch(setActivePage("my_project"));
  }, [setActivePage]);

  useEffect(() => {
    const body = {
      username: loggedUser.id,
    };
    if (clickMenu === "내가 소속된 프로젝트") {
      dispatch(getJoinList(body));
    }
    if (clickMenu === "내가 구성한 프로젝트") {
      dispatch(getMakedList(body));
    }
    if (clickMenu === "나의 프로젝트 지원 현황") {
      dispatch(getApplyProject(body));
    }
  }, [clickMenu]);

  useEffect(() => {
    if (!projectList || projectList.length === 0) return;
    let arr = [];
    for (let i = skip; i <= projectList.length - 1; i++) {
      if (arr.length < 8) arr.push(projectList[i]);
      if (arr.length > 8) break;
    }
    if (clickMenu === "내가 소속된 프로젝트") {
      setJoinList(arr);
    }
    if (clickMenu === "내가 구성한 프로젝트") {
      setMakedList(arr);
    }
    if (clickMenu === "나의 프로젝트 지원 현황") {
      setApplyList(arr);
    }
  }, [skip, projectList]);

  const onMenuClick = (e) => {
    setSkip(0);
    setClickMenu(e.target.innerHTML);
  };

  const isActive = (value) => {
    if (value === clickMenu) {
      return true;
    }
    return false;
  };

  const onPrevClick = () => {
    if (skip === 0) return;
    setSkip((prev) => prev - 8);
  };

  const onNextClick = () => {
    if (clickMenu === "내가 소속된 프로젝트") {
      if (
        projectList[projectList.length - 1] === joinList[joinList.length - 1]
      ) {
        return;
      }
    }
    if (clickMenu === "내가 구성한 프로젝트") {
      if (
        projectList[projectList.length - 1] === makedList[makedList.length - 1]
      ) {
        return;
      }
    }
    if (clickMenu === "나의 프로젝트 지원 현황") {
      if (
        projectList[projectList.length - 1] === applyList[makedList.length - 1]
      ) {
        return;
      }
    }
    setSkip((prev) => prev + 8);
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
        {(clickMenu === "내가 소속된 프로젝트" ||
          clickMenu === "내가 구성한 프로젝트") && (
          <PrevBtn onClick={onPrevClick} />
        )}

        <List>
          {clickMenu === "내가 소속된 프로젝트" &&
            joinList &&
            joinList.length > 0 &&
            joinList.map((v, i) => (
              <JoinProjectCard
                key={i}
                project={v.project_detail}
                project_id={v.id}
              />
            ))}
          {clickMenu === "내가 구성한 프로젝트" &&
            makedList &&
            makedList.length > 0 &&
            makedList.map((v, i) => <MakedProjectCard key={i} project={v} />)}
          {clickMenu === "나의 프로젝트 지원 현황" &&
            applyList &&
            applyList.length > 0 &&
            applyList.map((v, i) => <ApplyProjectComp key={i} project={v} />)}
        </List>
        {(clickMenu === "내가 소속된 프로젝트" ||
          clickMenu === "내가 구성한 프로젝트") && (
          <NextBtn onClick={onNextClick} />
        )}
      </ContentBox>
    </>
  );
};

export default MyProject;
