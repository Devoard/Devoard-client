import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PostAPI from '../api/PostAPI';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';
import ProjectDetail from '../components/ProjectDetail';
import {
  PageWrapper,
  RecruitDisplayWrapper,
  RecruitDisplayText,
  RecruitCnt,
  RecruitBtnWrapper,
  ApplyBtn,
  RecruitBtn,
  IntroTextWrapper,
  IntroText,
  PopularTeamWrapper,
  PopularTeamText,
  ProjectDetailWrapper,
  MoreProjectBtn
} from '../styles/Home';



const Home = () => {
  const [recruitCnt, setRecruitCnt] = useState(0);
  const dispatch = useDispatch();
  const project_wrapper = useRef(null);
  const text = "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText";

  useEffect(() => {
    let timer = null;

    const recruitCntAnimation = (totalCnt) => {
      let num = 0;
  
      timer = setInterval(() => {
        if (num === totalCnt) return null;
        setRecruitCnt(++num);
      }, 1000/totalCnt);
    };

    const getPostCnt = async() => {
      try {
        const posts = await PostAPI.getPosts('ongoing');
        const totalCnt = posts.length;
        recruitCntAnimation(totalCnt);
      } catch (err) {
        console.log(err);
      }
    };

    getPostCnt();

    dispatch(setActivePage('home'));
    project_wrapper.current.addEventListener('mousewheel', handleHorizontalScroll);
  
    return () => {
      clearInterval(timer);
    }
  }, [setActivePage]);


  const handleHorizontalScroll = (e) => {
    e.preventDefault();
    if(e.wheelDelta > 0)
      project_wrapper.current.scrollLeft -= 60;
    else
      project_wrapper.current.scrollLeft += 60;
  }

  return (
    <PageWrapper>
      <RecruitDisplayWrapper>
        <button><Link to="/survey">설문조사</Link></button>
        <RecruitDisplayText>
          <RecruitCnt>{recruitCnt}</RecruitCnt> 팀<br/>
          현재 모집 중
        </RecruitDisplayText>
        <RecruitBtnWrapper>
          <Link to="/devoard">
            <ApplyBtn color="orange">지원하기</ApplyBtn>
          </Link>
          <Link to="/write">
            <RecruitBtn color="orange">모집하기</RecruitBtn>
          </Link>
        </RecruitBtnWrapper>
      </RecruitDisplayWrapper>
      <IntroTextWrapper>
        <IntroText>사이트 소개</IntroText>
      </IntroTextWrapper>
      <PopularTeamWrapper>
        <PopularTeamText>현재 인기 있는 모집 팀</PopularTeamText>
        <ProjectDetailWrapper
          ref={project_wrapper}
        >
          <ProjectDetail 
            recruitState={true}
            projectTitle="Project Title"
            projectText={text}
          />
          <ProjectDetail
            recruitState={false}
            projectTitle="Title"
            projectText="Text"
          />
           <ProjectDetail 
            recruitState={true}
            projectTitle="Title"
            projectText="Text"
          />
          <ProjectDetail
            recruitState={false}
            projectTitle="Title"
            projectText="Text"
          />
           <ProjectDetail 
            recruitState={true}
            projectTitle="Title"
            projectText="Text"
          />
          <ProjectDetail
            recruitState={false}
            projectTitle="Title"
            projectText="Text"
          />
        </ProjectDetailWrapper>
        <Link
          to='/devoard'>
          <MoreProjectBtn 
            color="orange"
            outline
          >
            프로젝트 더 보기
          </MoreProjectBtn>
        </Link>
      </PopularTeamWrapper>
    </PageWrapper>
  );
}

export default Home;