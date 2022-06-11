import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PostAPI from '../lib/api/PostAPI';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../modules/user';
import ProjectDetail from '../components/common/ProjectDetail';
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
  const [recentPosts, setRecentPosts] = useState(null);
  const dispatch = useDispatch();
  const project_wrapper = useRef(null);

  useEffect(() => {
    let timer = null;

    const recruitCntAnimation = (cnt) => {
      let num = 0;
  
      timer = setInterval(() => {
        if (num === cnt) return null;
        setRecruitCnt(++num);
      }, 1000/cnt);
    };

    const getPostCnt = () => {
      PostAPI.getPosts('ongoing')
      .then(res => {
        const totalCnt = res.length;
        recruitCntAnimation(totalCnt);
      })
    };

    getPostCnt();
    PostAPI.getRecentPosts().then(res => setRecentPosts(res));

    dispatch(setActivePage('home'));
    project_wrapper.current.addEventListener('mousewheel', handleHorizontalScroll);
  
    return () => {
      clearInterval(timer);
    }
  }, []);


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
          {recentPosts &&
           recentPosts.map((post, i) => (
            <Link key={i} to={`/devoard/${post.id}`} style={{textDecoration: 'none'}}>
              <ProjectDetail 
                recruitState={post.recruit_state}
                field={post.field}
                title={post.title}
                body={post.body}
              />
            </Link>
          ))}
        </ProjectDetailWrapper>
        <Link to='/devoard'>
          <MoreProjectBtn color="orange" outline>
            프로젝트 더 보기
          </MoreProjectBtn>
        </Link>
      </PopularTeamWrapper>
    </PageWrapper>
  );
}

export default Home;