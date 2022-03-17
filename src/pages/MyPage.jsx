import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../modules/user';
import Title from '../components/Title';
import Button from '../components/Button';
import DevStackContents from '../components/StackContents';
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
  CheckBoxWrapper,
  CheckBox,
  Label,
  ExperienceWrapper,
  ImportantWrapper,
  LevelBox,
  Box,
  ButtonWrapper
} from '../styles/MyPage';


const important = ['디자인', '기능', 'UI/UX', '일정', '실력', '친목'];

const ImportantContents = () => (
  important.map((v, i) => (
    <CheckBoxWrapper key={i} style={{marginLeft: '1rem'}}>
      <CheckBox id={v} /><Label htmlFor={v}>{v}</Label>
    </CheckBoxWrapper>
  ))
)


const MyPage = () => {
  const [files, setFiles] = useState('');
  const [isFieldOpen, setIsFieldOpen] = useState({
    front_end: false,
    back_end: false,
    android: false,
    ios: false,
    data: false,
    devops: false
  });
  const imgInput = useRef();
  const { loggedUser } = useSelector(state=>state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePage('my_page'));
    //console.log(devStack['front_end'].stack);
  }, [setActivePage])

  useEffect(() => {
    setFiles(loggedUser.imageUrl);
  }, [loggedUser]);

  const onLoadImg = (e) => {
    setFiles(URL.createObjectURL(e.target.files[0]));
  }

  const onDeleteImg = () => {
    URL.revokeObjectURL(files);
    setFiles(defaultUserImg);
  }

  const resizeTextArea = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = (14 + e.target.scrollHeight) + "px";
  }

  return (
    <PageWrapper>
      <Title>마이 페이지</Title>
      <Background>
        <UserImgWrapper>
          {files &&
          <UserImg 
            src={files} 
            alt='user_img' 
          />}
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
            이미지 선택하기
          </UploadButton>
          <DeleteButton
            outline
            color="gray"
            onClick={onDeleteImg}
          >
            선택된 이미지 삭제하기
          </DeleteButton>
        </UserImgWrapper>
        <UserNameWrapper>
          <Text>이름</Text>
          <Text style={{fontWeight: 'normal', color: 'gray'}}>{loggedUser.id}</Text>
        </UserNameWrapper>
        <IntroWrapper>
          <Text>소개</Text>
          <TextArea 
            onChange={resizeTextArea}
          />
        </IntroWrapper>
        <ContactWrapper>
          <Text>연락처</Text>
          <Input />
        </ContactWrapper>
        <PfAddrWrapper>
          <Text>포트폴리오 주소</Text>
          <Input />
        </PfAddrWrapper>
        <DevStackWrapper>
          <Text>기술 스택</Text>
          {Object.keys(devStack).map((v, i) => (
            <DevStackContents
              key={i}
              field={v}
              isFieldOpen={isFieldOpen}
              setIsFieldOpen={setIsFieldOpen}
            />
          ))} 
        </DevStackWrapper>
        <ExperienceWrapper>
          <Text style={{marginRight: '3rem'}}>팀 프로젝트 경험 유무</Text>
          <LevelBox>
            <Box isChecked={true}>있음</Box>
            <Box>없음</Box>
          </LevelBox>
        </ExperienceWrapper>
        <ImportantWrapper>
          <Text>중요하게 생각하는 요소</Text>
          <ImportantContents />
        </ImportantWrapper>
        <ButtonWrapper>
          <Button 
            color="orange"
          >저장</Button>
          <Button
            color="gray"
          >취소</Button>
        </ButtonWrapper>
      </Background>
    </PageWrapper>
  )
}

export default MyPage;