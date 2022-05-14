import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoginPopUp from './LoginPopUp';
import ToggleMenu from './ToggleMenu';
import {
  HeaderArea,
  HeaderContainer,
  StaticMenuWrapper,
  Logo,
  ProjectMenu,
  UserMenuWrapper,
  UserIcon,
  LoginBtn,
  AlertBtn,
  ChatBtn
} from '../../styles/Header'
import { useSelector } from 'react-redux';

const Header = () => {
  const [isLoginPopUp, setIsLoginPopUp] = useState(false);
  const [isToggleMenuPopUp, setIsToggleMenuPopUp] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [hide, setHide] = useState(false);
  const { loggedIn, loggedUser, activePage } = useSelector(state=>state.user);
  const userIcon = useRef(null);

  useEffect(()=>{
    const handleCloseMenu = (e) => {
      if (!isToggleMenuPopUp && (userIcon.current === e.target)){
        setIsToggleMenuPopUp(true);
      }
    }

    window.addEventListener('mousedown', handleCloseMenu);

    return () => {
      window.removeEventListener('mousedown', handleCloseMenu);
    }
  }, [isToggleMenuPopUp]);

  useEffect(() => {
    const handleScroll = () => {
      const { pageYOffset } = window;
      const deltaY = pageYOffset - pageY;
      const hide = pageYOffset !== 0 && deltaY >= 0;

      setHide(hide);
      setPageY(pageYOffset);
    }
    
    const throttle = (callback, waitTime) => {
      let timerId = null;
      return () => {
        if (timerId) return;
        timerId = setTimeout(() => {
          callback();
          timerId = null;
        }, waitTime);
      }
    }

    const throttleScroll = throttle(handleScroll, 50);

    window.addEventListener('scroll', throttleScroll);

    return () => window.removeEventListener('scroll', throttleScroll);
  }, [pageY]);

  if (!loggedUser) return null;
  return (
    <HeaderArea>
      <HeaderContainer
        className={hide && 'hide'}
      >
        <StaticMenuWrapper>
          <Link to='/' style={{textDecoration: 'none'}}>
            <Logo>Devoard</Logo>
          </Link>
          <Link to='/devoard' style={{textDecoration: 'none'}}>
            <ProjectMenu>프로젝트</ProjectMenu>
          </Link>
        </StaticMenuWrapper>
        <UserMenuWrapper>
          {loggedIn ? 
          (<>
          <Link to="/chat/list">
            <ChatBtn 
              color={activePage === 'chat' ? '#FFB200' : 'white'}
              size='30'
            />
          </Link>
          <Link to="/alert">
            <AlertBtn 
              color={activePage === 'alert' ? '#FFB200' : 'white'}
              size='32'
            />
          </Link>
          {loggedUser.imageUrl &&
          <UserIcon 
            ref={userIcon}
            src={loggedUser.imageUrl}
          />}
          </>) :
          (<LoginBtn
            color='orange'
            outline
            onClick={()=>setIsLoginPopUp(true)}
          >
            로그인
          </LoginBtn>)}
        </UserMenuWrapper>
        <ToggleMenu
          isVisible={isToggleMenuPopUp}
          setIsVisible={setIsToggleMenuPopUp}
        />
      </HeaderContainer>

      <LoginPopUp
        loggedIn={loggedIn}
        isVisible={isLoginPopUp}
        setIsLoginPopUp={setIsLoginPopUp}
      >
      </LoginPopUp>
    </HeaderArea>
  );
}

export default Header;