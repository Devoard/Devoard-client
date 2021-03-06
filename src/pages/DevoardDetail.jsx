import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from "../modules/user";
import RecruitState from "../components/common/RecruitState";
import Tag from "../components/common/Tag";
import Button from "../components/common/Button";
import PopUp from "../components/common/PopUp";
import PostAPI from "../lib/api/PostAPI";
import {
  PageWrapper,
  Background,
  StateWrapper,
  UpdateWrapper,
  Edit,
  Remove,
  DetailWrapper,
  Title,
  InfoWrapper,
  UserWrapper,
  UserImg,
  UserName,
  DataWrapper,
  WriteDate,
  HeartWrapper,
  Heart,
  HeartCnt,
  DividerLine,
  TagWrapper,
  BodyWrapper,
  SubTitle,
  RecruitCnt,
  Field,
  Body,
  Period,
  Situation,
  ButtonWrapper,
  CheckText,
  SubText,
  PopUpBtnWrapper,
} from "../styles/DevoardDetail";

const DevoardDetail = () => {
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState("");
  const [isWriter, setIsWriter] = useState(false);
  const [isRemovePopUp, setIsRemovePopUp] = useState(false);
  const [isCheckPopUp, setIsCheckPopUp] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    console.log(post.situation);
  }, []);

  const getPost = () => {
    PostAPI.getDetailPost(postId).then((res) => setPost(res));
  };

  const removePost = () => {
    PostAPI.removePost(postId).then(navigate("/devoard"));
  };

  const updateRecruitState = () => {
    PostAPI.updateRecruit(postId, {
      ...post,
      recruit_state: false,
    }).then(() => {
      setIsCheckPopUp(false);
      getPost();
    });
  };

  useEffect(() => {
    dispatch(setActivePage("detail"));
    getPost();
  }, []);

  useEffect(() => {
    const checkIsWriter = () => {
      if (post.username === loggedUser.username) setIsWriter(true);
    };

    if (post) checkIsWriter();
  }, [post, loggedUser]);

  useEffect(() => {
    if (!post || post.field === "") return null;
    const tags = post.field.split(",");
    setTags(tags);
  }, [post]);

  if (!post) return null;
  return (
    <PageWrapper>
      <Background>
        <StateWrapper>
          <RecruitState isRecruit={post.recruit_state} />
          <UpdateWrapper>
            {isWriter && post.recruit_state && (
              <Link to={`/write/${postId}`} style={{ textDecoration: "none" }}>
                <Edit>??????</Edit>
              </Link>
            )}
            {isWriter && (
              <Remove onClick={() => setIsRemovePopUp(true)}>??????</Remove>
            )}
          </UpdateWrapper>
        </StateWrapper>
        <DetailWrapper>
          <Title>{post.title}</Title>
          <InfoWrapper>
            <UserWrapper>
              <UserImg src={post.writer.git_userImg} />
              <UserName>{post.writer.username}</UserName>
            </UserWrapper>
            <DataWrapper>
              <WriteDate>{post.date}</WriteDate>
              <HeartWrapper>
                <Heart />
                <HeartCnt>100</HeartCnt>
              </HeartWrapper>
            </DataWrapper>
          </InfoWrapper>
          <DividerLine />
          <TagWrapper>
            {tags && tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
          </TagWrapper>
          <BodyWrapper>
            <SubTitle>?????? ??????</SubTitle>
            <RecruitCnt>
              {parseInt(post.frontend_cnt) > 0 && (
                <Field>Front-end : {post.frontend_cnt} ???</Field>
              )}
              {parseInt(post.backend_cnt) > 0 && (
                <Field>Back-end : {post.backend_cnt} ???</Field>
              )}
              {parseInt(post.android_cnt) > 0 && (
                <Field>Android : {post.android_cnt} ???</Field>
              )}
              {parseInt(post.ios_cnt) > 0 && (
                <Field>IOS : {post.ios_cnt} ???</Field>
              )}
              {parseInt(post.data_cnt) > 0 && (
                <Field>Data : {post.data_cnt} ???</Field>
              )}
              {parseInt(post.devops_cnt) > 0 && (
                <Field>Devops : {post.devops_cnt} ???</Field>
              )}
            </RecruitCnt>
            <SubTitle>???????????? ??????</SubTitle>
            <Body>{post.body}</Body>
            <SubTitle>?????? ?????? ??????</SubTitle>
            <Period>{post.period}</Period>
            <SubTitle>?????? ??????</SubTitle>
            <Situation>{post.done}</Situation>
            <ButtonWrapper>
              {isWriter && post.recruit_state && (
                <Button onClick={() => setIsCheckPopUp(true)} color="orange">
                  ?????? ??????
                </Button>
              )}
              {!isWriter && post.recruit_state && (
                <>
                  <Button color="orange">????????????</Button>
                  <Button color="gray" outline style={{ marginLeft: "2rem" }}>
                    ????????????
                  </Button>
                </>
              )}
            </ButtonWrapper>
          </BodyWrapper>
        </DetailWrapper>
      </Background>
      <PopUp
        isVisible={isCheckPopUp}
        width={"30rem"}
        height={"13rem"}
        setIsPopUp={setIsCheckPopUp}
      >
        <CheckText>????????? ?????????????????????????</CheckText>
        <SubText>?????? ?????? ??? ????????? ??????????????????.</SubText>
        <PopUpBtnWrapper>
          <Button color="gray" onClick={() => setIsCheckPopUp(false)}>
            ??????
          </Button>
          <Button
            color="orange"
            style={{ marginLeft: "1rem" }}
            onClick={updateRecruitState}
          >
            ??????
          </Button>
        </PopUpBtnWrapper>
      </PopUp>
      <PopUp
        isVisible={isRemovePopUp}
        width={"30rem"}
        height={"13rem"}
        setIsPopUp={setIsRemovePopUp}
      >
        <CheckText>???????????? ?????????????????????????</CheckText>
        <SubText>????????? ???????????? ????????? ??? ????????????.</SubText>
        <PopUpBtnWrapper>
          <Button color="gray" onClick={() => setIsRemovePopUp(false)}>
            ??????
          </Button>
          <Button
            color="orange"
            style={{ marginLeft: "1rem" }}
            onClick={removePost}
          >
            ??????
          </Button>
        </PopUpBtnWrapper>
      </PopUp>
    </PageWrapper>
  );
};

export default DevoardDetail;
