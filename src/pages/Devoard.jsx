import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PostAPI from '../lib/api/PostAPI';
import { setActivePage } from '../modules/user';
import Title from '../components/common/Title';
import Loading from '../components/common/Loading';
import ProjectDetail from '../components/common/ProjectDetail';
import WriteBtn from '../components/Write/WriteBtn';
import {
  PageWrapper,
  SortingWrapper,
  ComboBox,
  SelectedText,
  DownIcon,
  ProjectWrapper,
  MenuWrapper,
  Menu,
  Search,
  SearchInput,
  SearchIcon,
  Target
} from '../styles/Devoard';

const Devoard = () => {
  const [posts, setPosts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("전체 보기");
  const comboBox = useRef(null);
  const menuWrapper = useRef(null);
  const target = useRef(null);
  const limit = useRef(4);
  const dispatch = useDispatch();
  let isScroll = useRef(true);
  let page = useRef(1);


  const getSortedPosts = async() => {
    if (!isScroll.current) return null;
    let option = null;
    
    if (selectedMenu === "전체 보기") option = 'all';
    else if (selectedMenu === "모집 중") option = 'ongoing';
    else if (selectedMenu === "모집 완료") option = 'done';
      
    const result = await PostAPI.getPosts(option, page.current++);
    //console.log({ option, result })
    if (result.length < limit.current) isScroll.current = false;

    setPosts(posts => posts.concat(result));
  }

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && isScroll.current) {
      observer.unobserve(entry.target);
      await getSortedPosts();
      observer.observe(entry.target);
    }
  }

  useEffect(() => {
    let observer;

    if (target) {
      console.log("다시 생성")
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.7
      });
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [selectedMenu]);

  useEffect(() => {
    console.log(posts)
  }, [posts])

  useEffect(() => {
    console.log(isScroll)
  }, [isScroll])

  useEffect(()=>{
    dispatch(setActivePage('devoard'));
    
    const handleCloseMenu = (e) => {
      if (!isMenuOpen) {
        if (comboBox.current.contains(e.target))
          setIsMenuOpen(true);
      }
      else {
        if (menuWrapper.current.contains(e.target))
          setSelectedMenu(e.target.attributes.getNamedItem("data-value").value);
          isScroll.current = true;
          page.current = 1;
          setPosts([]);
          setIsMenuOpen(false);
      } 
    }

    window.addEventListener('mousedown', handleCloseMenu);

    return () => {
      window.removeEventListener('mousedown', handleCloseMenu);
    }
  }, [setActivePage, isMenuOpen]);


  return (
    <PageWrapper>
      <Title>현재 모집 중인 프로젝트</Title>
      <SortingWrapper>
        <ComboBox
          ref={comboBox}
        >
          <SelectedText>
            {selectedMenu}
          </SelectedText>
          {isMenuOpen &&
            <MenuWrapper
              ref={menuWrapper}
            >
              <Menu data-value="전체 보기">전체 보기</Menu>
              <Menu data-value="모집 중">모집 중</Menu>
              <Menu data-value="모집 완료">모집 완료</Menu>
            </MenuWrapper>}
          <DownIcon />
        </ComboBox>
        <Search>
          <SearchInput />
          <SearchIcon color='black' size='24'/>
        </Search>
      </SortingWrapper>
      <ProjectWrapper>
        {posts &&
         posts.map(post => (
          <Link 
            to={'/devoard/' + post.id} 
            key={post.id}
            style={{ color: '#333333' }}
          >
            <ProjectDetail
              key={post.id}
              title={post.title}
              body={post.body}
              field={post.field}
              recruitState={post.recruit_state}
            />
          </Link>
        ))}
        <Target ref={target}></Target>
      </ProjectWrapper>
      <Link to='/write' style={{ color: '#333333' }}>
        <WriteBtn />
      </Link>
    </PageWrapper>
  )
}

export default Devoard;