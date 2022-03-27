import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage, setLoggedUser } from '../modules/user';
import ProfileAPI from '../api/ProfileAPI';
import Title from '../components/Title';
import Button from '../components/Button';
import PopUp from '../components/PopUp';
import DevStackContents from '../components/StackContents';
import ImportantContents from '../components/ImportantContents';
import devStack from '../assets/data/devStack.json';
import defaultUserImg from '../assets/images/defaultUserImg.png';
import {
  PageWrapper,
  Background,
  UserImgWrapper,
  UserImg,
  ImgInput,
  UploadButton,
  DeleteButton,
  Text,
  Input,
  TextArea,
  UserNameWrapper,
  IntroWrapper,
  ContactWrapper,
  PfAddrWrapper,
  DevStackWrapper,
  ExperienceWrapper,
  ImportantWrapper,
  LevelBox,
  Box,
  ButtonWrapper,
  CheckText,
  PopUpBtnWrapper
} from '../styles/MyPage';


const MyPage = () => {
  const [files, setFiles] = useState('');
  const [intro, setIntro] = useState('');
  const [contact, setContact] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [isFieldOpen, setIsFieldOpen] = useState({
    front_end: true,
    back_end: true,
    android: true,
    ios: true,
    data: true,
    devops: true
  });
  const [stackLevel, setStackLevel] = useState({
    front_end: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    back_end: [0, 0, 0, 0, 0, 0],
    android: [0],
    ios: [0, 0, 0],
    data: [0],
    devops: [0]
  });
  const [important, setImportant] = useState({
    design: false,
    feature: false,
    ui_ux: false,
    schedule: false,
    skill: false,
    socialize: false,
  });
  const [isExperienced, setIsExperienced] = useState(false);
  const [isCheckPopUp, setIsCheckPopUp] = useState(false);
  const { loggedUser } = useSelector(state => state.user);
  const imgInput = useRef();
  const dispatch = useDispatch();


  const onLoadImg = (e) => {
    setFiles(URL.createObjectURL(e.target.files[0]));
  }

  const onDeleteImg = () => {
    URL.revokeObjectURL(files);
    setFiles(defaultUserImg);
  }

  const getData = async() => {
    const data = await ProfileAPI.getProfileData(loggedUser.id)
    
    setFiles(data.user_img);
    setIntro(data.user_intro);
    setContact(data.user_connect);
    setPortfolio(data.user_pf_addr);
    setStackLevel(data.user_stack);
    setIsExperienced(data.user_exp);
    setImportant(data.user_import);
  } 

  const updateData = async() => {
    await ProfileAPI.updateProfileData(
      loggedUser.id, {
        user_img: files,
        user_intro: intro,
        user_connect: contact,
        user_pf_addr: portfolio,
        user_stack: stackLevel,
        user_exp: isExperienced,
        user_import: important
      }
    )
    .then(() => {
      window.scrollTo(0, 0);
      setIsCheckPopUp(false);
      /*dispatch(setLoggedUser({
        ...loggedUser,
        imageUrl: files
      }))*/
    })
  }

  const resizeTextArea = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = (14 + e.target.scrollHeight) + "px";
  }

  useEffect(() => {
    dispatch(setActivePage('my_page'));
  }, [dispatch])

  useEffect(() => {
    setFiles(loggedUser.imageUrl);
    if (loggedUser.id) getData();
  }, [loggedUser]);



  return (
    <PageWrapper>
      <Title>마이 페이지</Title>
      <Background>
        <UserImgWrapper>
          {files &&
          <UserImg src={files} alt='user_img' />}
          <ImgInput 
            ref={imgInput}
            type="file"
            id="userImg"
            accept="image/*"
            onChange={onLoadImg}
          />
          <UploadButton
            color="orange"
            onClick={() => {imgInput.current.click()}}
          >
            이미지 선택
          </UploadButton>
          <DeleteButton
            outline
            color="gray"
            onClick={onDeleteImg}
          >
            선택된 이미지 삭제
          </DeleteButton>
        </UserImgWrapper>
        <UserNameWrapper>
          <Text>이름</Text>
          <Text style={{fontWeight: 'normal', color: 'gray'}}>{loggedUser.id}</Text>
        </UserNameWrapper>
        <IntroWrapper>
          <Text>소개</Text>
          <TextArea 
            value={intro}
            onChange={(e) => {
              resizeTextArea(e);
              setIntro(e.target.value);
            }}
          />
        </IntroWrapper>
        <ContactWrapper>
          <Text>연락처</Text>
          <Input 
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </ContactWrapper>
        <PfAddrWrapper>
          <Text>포트폴리오 주소</Text>
          <Input 
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />
        </PfAddrWrapper>
        <DevStackWrapper>
          <Text>기술 스택</Text>
          {Object.keys(devStack).map((v, i) => (
            <DevStackContents
              key={i}
              field={v}
              isFieldOpen={isFieldOpen}
              setIsFieldOpen={setIsFieldOpen}
              stackLevel={stackLevel}
              setStackLevel={setStackLevel}
            />
          ))} 
        </DevStackWrapper>
        <ExperienceWrapper>
          <Text style={{marginRight: '3rem'}}>팀 프로젝트 경험 유무</Text>
          <LevelBox>
            <Box 
              isChecked={isExperienced}
              onClick={() => setIsExperienced(true)}
            >있음</Box>
            <Box
              isChecked={!isExperienced}
              onClick={() => setIsExperienced(false)}
            >없음</Box>
          </LevelBox>
        </ExperienceWrapper>
        <ImportantWrapper>
          <Text>중요하게 생각하는 요소</Text>
          <ImportantContents 
            important={important}
            setImportant={setImportant}
          />
        </ImportantWrapper>
        <ButtonWrapper>
          <Button 
            color="orange"
            onClick={() => setIsCheckPopUp(true)}
          >저장</Button>
          <Button
            color="gray"
          >취소</Button>
        </ButtonWrapper>
      </Background>
      <PopUp
        isVisible={isCheckPopUp}
        width="23rem"
        height="12rem"
        setIsPopUp={setIsCheckPopUp}
      >
        <CheckText>내 정보를 변경하시겠습니까?</CheckText>
        <PopUpBtnWrapper>
          <Button
            color="orange"
            onClick={updateData}
          >확인</Button>
          <Button
            color="gray"
            style={{marginLeft: '1rem'}}
            onClick={() => setIsCheckPopUp(false)}
          >취소</Button>
        </PopUpBtnWrapper>
      </PopUp>
    </PageWrapper>
  )
}

export default MyPage;