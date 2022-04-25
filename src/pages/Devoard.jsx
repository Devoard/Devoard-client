import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PostAPI from '../api/PostAPI';
import { setActivePage } from '../modules/user';
import Title from '../components/Title';
import ProjectDetail from '../components/ProjectDetail';
import WriteBtn from '../components/WriteBtn';
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
  SearchIcon
} from '../styles/Devoard';

const Devoard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("전체 보기");
  const comboBox = useRef(null);
  const menuWrapper = useRef(null);

  useEffect(()=>{
    dispatch(setActivePage('devoard'));
    
    const handleCloseMenu = (e) => {
      if (loading) return null;

      if (!isMenuOpen) {
        if (comboBox.current.contains(e.target))
          setIsMenuOpen(true);
      }
      else {
        if (menuWrapper.current.contains(e.target))
          setSelectedMenu(e.target.attributes.getNamedItem("data-value").value);
        setIsMenuOpen(false);
      } 
    }

    window.addEventListener('mousedown', handleCloseMenu);

    return () => {
      window.removeEventListener('mousedown', handleCloseMenu);
    }
  }, [setActivePage, isMenuOpen])

  useEffect(() => {
    const getSortedPosts = async() => {
      let posts = null;
      
      if (selectedMenu === "전체 보기")
        posts = await PostAPI.getPosts('all');
      else if (selectedMenu === "모집 중")
        posts = await PostAPI.getPosts('ongoing');
      else if (selectedMenu === "모집 완료")
        posts = await PostAPI.getPosts('done');
      setPosts(posts);
    }

    getSortedPosts();
  }, [selectedMenu]);

  if (loading) return <div style={{color: 'white'}}>로딩 중 ...</div>;
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
              projectTitle={post.title}
              projectText={post.body}
              tags={post.field}
              recruitState={post.recruit_state}
            />
          </Link>
        ))}
      </ProjectWrapper>
      <Link to='/write' style={{ color: '#333333' }}>
        <WriteBtn />
      </Link>
    </PageWrapper>
  )
}

export default Devoard;