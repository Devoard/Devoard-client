import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MakedProjectCard from "../components/MakedProjectCard";
import { getJoinList, getMakedList } from "../modules/project";
import { setActivePage } from "../modules/user";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import JoinProjectCard from "../components/JoinProjectCard";
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
  const [projectList, setProjectList] = useState([]);
  const { loggedUser } = useSelector((state) => state.user);
  const [clickMenu, setClickMenu] = useState("내가 소속된 프로젝트");
  const [dataList, setDataList] = useState([]);
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    dispatch(setActivePage("my_project"));
  }, [setActivePage]);
  useEffect(() => {
    const body = {
      username: loggedUser.id,
    };
    if (clickMenu === "내가 소속된 프로젝트") {
      dispatch(getJoinList(body)).then((res) => {
        setProjectList(res.payload);
        console.log(res.payload);
      });
    }
    if (clickMenu === "내가 구성한 프로젝트") {
      dispatch(getMakedList(body)).then((res) => {
        setProjectList(res.payload);
      });
    }
    if (clickMenu === "나의 프로젝트 지원 현황") {
    }
  }, [clickMenu]);

  useEffect(() => {
    if (!projectList || projectList.length === 0) return;
    let arr = [];
    for (let i = skip; i <= projectList.length - 1; i++) {
      if (arr.length < 8) arr.push(projectList[i]);
      if (arr.length > 8) break;
    }
    setDataList(arr);
    console.log("asdsa");
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
    if (projectList[projectList.length - 1] === dataList[dataList.length - 1])
      return;
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
        <PrevBtn onClick={onPrevClick} />
        <List>
          {clickMenu === "내가 구성한 프로젝트" &&
            dataList.length > 0 &&
            dataList.map((v, i) => (
              <MakedProjectCard
                key={i}
                title={v.title}
                // isLike={v.isLike}
                field={v.field}
                body={v.body}
                done={v.done}
              />
            ))}
          {clickMenu === "내가 소속된 프로젝트" &&
            dataList.length > 0 &&
            dataList.map((v, i) => <JoinProjectCard key={i} project={v} />)}
        </List>

        <NextBtn onClick={onNextClick} />
      </ContentBox>
    </>
  );
};

export default MyProject;
