import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import Cookies from 'universal-cookie';
import GoogleLogin from 'react-google-login';
import githubIcon from '../assets/images/githubIcon.png';
import googleIcon from '../assets/images/googleIcon.png';
import PopUp from './PopUp';
import { useDispatch } from "react-redux";
import { setLoggedIn, setLoggedUser } from '../modules/user';
import setAuthorizationToken from "../utils/setAuthorizationToken";

const LoginText = styled.h1`
  margin-bottom: 2.5rem;
`;

const IconWrapper = styled.div``;

const Icon = styled.img`
  width: 4rem;
  height: 4rem;
  margin: 0 1.5rem;
  border-radius: 1px solid gray;
  cursor: pointer;
`;

const GithubLink = styled.a``;

const GithubIcon = styled(Icon).attrs({
  src: `${githubIcon}`
})``;



const LoginPopUp = ({ isVisible, setIsLoginPopUp }) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem('name')) {
      dispatch(setLoggedIn());

      const name = window.sessionStorage.getItem('name');
      const imageUrl = window.sessionStorage.getItem('imageUrl');
  
      dispatch(setLoggedUser({
        id: name,
        imageUrl: imageUrl
      }));
    }
    else if (cookies.get('token')) {
      dispatch(setLoggedIn());

      try {
        const username = cookies.get('git_username');
        const imageUrl = cookies.get('git_userImg');
        const token = cookies.get('token');

        console.log(username, imageUrl, token);

        dispatch(setLoggedUser({
          id: username,
          imageUrl: imageUrl,
          token: token
        }))
        setAuthorizationToken(token);
      } catch (err) {
        console.log(err);
      }
    }

  }, [setLoggedIn, setLoggedUser]);

  const onSuccess = (res) => {
    dispatch(setLoggedIn());
    setIsLoginPopUp(false);
    doSignIn(res);
  }

  const onFailure = (err) => {
    console.log(err);
  };

  const doSignIn = (res) => {
    if (!window.sessionStorage.getItem('name')) {
      const { profileObj : { name, imageUrl }} = res;

      window.sessionStorage.setItem('name', name);
      window.sessionStorage.setItem('imageUrl', imageUrl);

      const loggedUser = {
        id: name,
        imageUrl: imageUrl
      }

      dispatch(setLoggedUser(loggedUser));

      axios.post('http://localhost:8000/user_info', loggedUser)
      .then (res => {
        if (res.status === 201) 
          navigate('/survey');
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  if (!isVisible) return null;
  return (
    <PopUp
      isVisible={isVisible}
      setIsPopUp={setIsLoginPopUp}
      width='25rem'
      height='15rem'
    >
      <LoginText>Social Login</LoginText>
      <IconWrapper>
        <GoogleLogin
          render={ renderProps => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{
                background: 'none',
                outline: 'none',
                border: 'none',
                cursor: 'pointer',
                margin: '0 1.5rem'
              }}
            >
              <img
                src={googleIcon}
                alt="google login icon"
                style={{
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "50%",
                }}
              />
            </button>
            )}
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            responseType={"id_token"}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
        <GithubLink
          href={`https://github.com/login/oauth/authorize?client_id=c3af9d17e5bb52d76a87&redirect_uri=http://localhost:8000/user/github/callback/`}
        >
          <GithubIcon />
        </GithubLink>
      </IconWrapper>
    </PopUp>
  );
}

export default LoginPopUp;