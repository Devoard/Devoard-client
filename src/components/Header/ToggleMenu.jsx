import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setLoggedIn, setLoggedUser } from '../../modules/user';

const MenuWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 5rem;
  box-shadow: 0px 0px 12px #444444;
  z-index: 1;
`;

const Menu = styled.div`
  width: 11rem;
  height: 3rem;
  background: white;
  line-height: 3rem;
  padding: 0 1.5rem;
  font-size: 1.07rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: rgb(233, 232, 232);
  }
`;


const ToggleMenu = ({ isVisible, setIsVisible }) => { 
  const menu = useRef(null);
  const logout_menu = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const doSignOut = () => {
    if (!window.sessionStorage.getItem('name')) return null;

    navigate('/');

    if (window.sessionStorage.getItem('name')) {
      window.sessionStorage.removeItem('name');
      window.sessionStorage.removeItem('email');
      window.sessionStorage.removeItem('imageUrl');
    }
    else {
      
    }

    dispatch(setLoggedIn());
    dispatch(setLoggedUser({
      username: '',
      id: '',
      imageUrl: ''
    }))
  }
  
  const handleCloseMenu = (e) => {
    if (!isVisible) return null;
    if (logout_menu.current === e.target) 
      doSignOut();
    else if (menu.current.contains(e.target))
      navigate(e.target.attributes.getNamedItem("data-link").value)
 
    setIsVisible(false);
  }

  useEffect(()=>{
    window.addEventListener('mousedown', handleCloseMenu);

    return () => {
      window.removeEventListener('mousedown', handleCloseMenu);
    }
  });

  if (!isVisible) return null;
  return(
    <>
      <MenuWrapper
        ref={menu}
      >
        <Menu data-link="/scrap">스크랩</Menu>
        <Menu data-link="/my_project">나의 프로젝트</Menu>
        <Menu data-link="/user/profile">마이 페이지</Menu>
        <Menu
          ref={logout_menu}
        >로그아웃</Menu>
      </MenuWrapper>
    </>
  );
};

export default ToggleMenu;