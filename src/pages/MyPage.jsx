import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from "../modules/user";
import ProfileAPI from "../lib/api/ProfileAPI";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import PopUp from "../components/common/PopUp";
import DevStackContents from "../components/MyPage/StackContents";
import ImportantContents from "../components/MyPage/ImportantContents";
import devStack from "../assets/data/devStack.json";
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
  JobWrapper,
  ComboBox,
  Option,
  ContactWrapper,
  PfAddrWrapper,
  DevStackWrapper,
  ExperienceWrapper,
  TimeWrapper,
  ImportantWrapper,
  HowWrapper,
  LevelBox,
  Box,
  ButtonWrapper,
  CheckText,
  PopUpBtnWrapper,
} from "../styles/MyPage";

const MyPage = () => {
  const [data, setData] = useState(null);
  const [intro, setIntro] = useState("");
  const [job, setJob] = useState(0);
  const [contact, setContact] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [isFieldOpen, setIsFieldOpen] = useState({
    front_end: true,
    back_end: true,
    android: true,
    ios: true,
    data: true,
    devops: true,
  });
  const [stackLevel, setStackLevel] = useState({
    front_end: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    back_end: [0, 0, 0, 0, 0, 0],
    android: [0],
    ios: [0, 0, 0],
    data: [0],
    devops: [0],
  });
  const [important, setImportant] = useState({
    design: false,
    feature: false,
    ui_ux: false,
    schedule: false,
    skill: false,
    socialize: false,
  });
  const [time, setTime] = useState("");
  const [isExperienced, setIsExperienced] = useState(false);
  const [how, setHow] = useState("");
  const [isCheckPopUp, setIsCheckPopUp] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getData = async () => {
    const data = await ProfileAPI.getProfileData(loggedUser.id);

    if (!data) {
      //navigate('/survey')
    } else {
      setData(data);
      setIntro(data.user_intro);
      setJob(data.user_job);
      setContact(data.user_connect);
      setPortfolio(data.user_pf_addr);
      //setStackLevel(data.user_stack);
      setIsExperienced(data.user_exp);
      setTime(data.user_time);
      setImportant(data.user_import.split(','));
      setHow(data.user_how);
    }
  };

  const updateData = () => {
    ProfileAPI.updateProfileData(loggedUser.id, {
      user_intro: intro,
      user_connect: contact,
      user_pf_addr: portfolio,
      //user_stack: stackLevel,
      user_exp: isExperienced,
      user_import: important,
    }).then(() => {
      window.scrollTo(0, 0);
      setIsCheckPopUp(false);
    });
  };

  const resizeTextArea = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = 14 + e.target.scrollHeight + "px";
  };

  useEffect(() => {
    dispatch(setActivePage("my_page"));
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser.id) getData();
  }, [loggedUser]);

  //if (!data) return null;
  return (
    <PageWrapper>
      <Title>마이 페이지</Title>
      <Background>
        <UserNameWrapper>
          <Text>이름</Text>
          <Text style={{ fontWeight: "normal", color: "gray" }}>
            {loggedUser.id}
          </Text>
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
        <JobWrapper>
          <Text>직업</Text>
          <ComboBox
            id="job"
            name="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          >
            <Option label="-- 선택하세요 --" />
            <Option value={0}>학생</Option>
            <Option value={1}>취업 준비생</Option>
            <Option value={2}>직장인</Option>
          </ComboBox>
        </JobWrapper>
        <ContactWrapper>
          <Text>연락처</Text>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} />
        </ContactWrapper>
        <PfAddrWrapper>
          <Text>포트폴리오 주소</Text>
          <Input
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />
        </PfAddrWrapper>
        {/*<DevStackWrapper>
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
        </DevStackWrapper>*/}
        <ExperienceWrapper>
          <Text style={{ marginRight: "3rem" }}>팀 프로젝트 경험 유무</Text>
          <LevelBox>
            <Box
              isChecked={isExperienced}
              onClick={() => setIsExperienced(true)}
            >
              있음
            </Box>
            <Box
              isChecked={!isExperienced}
              onClick={() => setIsExperienced(false)}
            >
              없음
            </Box>
          </LevelBox>
        </ExperienceWrapper>
        <TimeWrapper>
          <Text>활동 가능 시간</Text>
          <ComboBox
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <Option label="-- 선택하세요 --" />
            <Option value="평일 9AM ~ 12PM">평일 9AM ~ 12PM</Option>
            <Option value="평일 12PM ~ 6PM">평일 12PM ~ 6PM</Option>
            <Option value="평일 6PM ~ 12AM">평일 6PM ~ 12AM</Option>
            <Option value="주말 9AM ~ 12PM">주말 9AM ~ 12PM</Option>
            <Option value="주말 12PM ~ 6PM">주말 12PM ~ 6PM</Option>
            <Option value="주말 6PM ~ 12PM">주말 6PM ~ 12PM</Option>
          </ComboBox>
        </TimeWrapper>
        <ImportantWrapper>
          <Text>중요하게 생각하는 요소</Text>
          <ImportantContents
            important={important}
            setImportant={setImportant}
          />
        </ImportantWrapper>
        <HowWrapper>
          <Text style={{ marginRight: "7rem" }}>선호하는 방식</Text>
          <LevelBox>
            <Box
              isChecked={how === "온라인" ? true : false}
              onClick={() => setHow("온라인")}
            >
              온라인
            </Box>
            <Box
              isChecked={how === "오프라인" ? true : false}
              onClick={() => setHow("오프라인")}
            >
              오프라인
            </Box>
          </LevelBox>
        </HowWrapper>
        <ButtonWrapper>
          <Button color="orange" onClick={() => setIsCheckPopUp(true)}>
            저장
          </Button>
          <Button color="gray">취소</Button>
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
          <Button color="orange" onClick={updateData}>
            확인
          </Button>
          <Button
            color="gray"
            style={{ marginLeft: "1rem" }}
            onClick={() => setIsCheckPopUp(false)}
          >
            취소
          </Button>
        </PopUpBtnWrapper>
      </PopUp>
    </PageWrapper>
  );
};

export default MyPage;
