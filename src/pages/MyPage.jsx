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
      <Title>?????? ?????????</Title>
      <Background>
        <UserNameWrapper>
          <Text>??????</Text>
          <Text style={{ fontWeight: "normal", color: "gray" }}>
            {loggedUser.id}
          </Text>
        </UserNameWrapper>
        <IntroWrapper>
          <Text>??????</Text>
          <TextArea
            value={intro}
            onChange={(e) => {
              resizeTextArea(e);
              setIntro(e.target.value);
            }}
          />
        </IntroWrapper>
        <JobWrapper>
          <Text>??????</Text>
          <ComboBox
            id="job"
            name="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          >
            <Option label="-- ??????????????? --" />
            <Option value={0}>??????</Option>
            <Option value={1}>?????? ?????????</Option>
            <Option value={2}>?????????</Option>
          </ComboBox>
        </JobWrapper>
        <ContactWrapper>
          <Text>?????????</Text>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} />
        </ContactWrapper>
        <PfAddrWrapper>
          <Text>??????????????? ??????</Text>
          <Input
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />
        </PfAddrWrapper>
        {/*<DevStackWrapper>
          <Text>?????? ??????</Text>
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
          <Text style={{ marginRight: "3rem" }}>??? ???????????? ?????? ??????</Text>
          <LevelBox>
            <Box
              isChecked={isExperienced}
              onClick={() => setIsExperienced(true)}
            >
              ??????
            </Box>
            <Box
              isChecked={!isExperienced}
              onClick={() => setIsExperienced(false)}
            >
              ??????
            </Box>
          </LevelBox>
        </ExperienceWrapper>
        <TimeWrapper>
          <Text>?????? ?????? ??????</Text>
          <ComboBox
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <Option label="-- ??????????????? --" />
            <Option value="?????? 9AM ~ 12PM">?????? 9AM ~ 12PM</Option>
            <Option value="?????? 12PM ~ 6PM">?????? 12PM ~ 6PM</Option>
            <Option value="?????? 6PM ~ 12AM">?????? 6PM ~ 12AM</Option>
            <Option value="?????? 9AM ~ 12PM">?????? 9AM ~ 12PM</Option>
            <Option value="?????? 12PM ~ 6PM">?????? 12PM ~ 6PM</Option>
            <Option value="?????? 6PM ~ 12PM">?????? 6PM ~ 12PM</Option>
          </ComboBox>
        </TimeWrapper>
        <ImportantWrapper>
          <Text>???????????? ???????????? ??????</Text>
          <ImportantContents
            important={important}
            setImportant={setImportant}
          />
        </ImportantWrapper>
        <HowWrapper>
          <Text style={{ marginRight: "7rem" }}>???????????? ??????</Text>
          <LevelBox>
            <Box
              isChecked={how === "?????????" ? true : false}
              onClick={() => setHow("?????????")}
            >
              ?????????
            </Box>
            <Box
              isChecked={how === "????????????" ? true : false}
              onClick={() => setHow("????????????")}
            >
              ????????????
            </Box>
          </LevelBox>
        </HowWrapper>
        <ButtonWrapper>
          <Button color="orange" onClick={() => setIsCheckPopUp(true)}>
            ??????
          </Button>
          <Button color="gray">??????</Button>
        </ButtonWrapper>
      </Background>
      <PopUp
        isVisible={isCheckPopUp}
        width="23rem"
        height="12rem"
        setIsPopUp={setIsCheckPopUp}
      >
        <CheckText>??? ????????? ?????????????????????????</CheckText>
        <PopUpBtnWrapper>
          <Button color="orange" onClick={updateData}>
            ??????
          </Button>
          <Button
            color="gray"
            style={{ marginLeft: "1rem" }}
            onClick={() => setIsCheckPopUp(false)}
          >
            ??????
          </Button>
        </PopUpBtnWrapper>
      </PopUp>
    </PageWrapper>
  );
};

export default MyPage;
