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
      if (post.writer.username == loggedUser.id) setIsWriter(true);
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
                <Edit>수정</Edit>
              </Link>
            )}
            {isWriter && (
              <Remove onClick={() => setIsRemovePopUp(true)}>삭제</Remove>
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
            <SubTitle>모집 인원</SubTitle>
            <RecruitCnt>
              {parseInt(post.frontend_cnt) > 0 && (
                <Field>Front-end : {post.frontend_cnt} 명</Field>
              )}
              {parseInt(post.backend_cnt) > 0 && (
                <Field>Back-end : {post.backend_cnt} 명</Field>
              )}
              {parseInt(post.android_cnt) > 0 && (
                <Field>Android : {post.android_cnt} 명</Field>
              )}
              {parseInt(post.ios_cnt) > 0 && (
                <Field>IOS : {post.ios_cnt} 명</Field>
              )}
              {parseInt(post.data_cnt) > 0 && (
                <Field>Data : {post.data_cnt} 명</Field>
              )}
              {parseInt(post.devops_cnt) > 0 && (
                <Field>Devops : {post.devops_cnt} 명</Field>
              )}
            </RecruitCnt>
            <SubTitle>프로젝트 설명</SubTitle>
            <Body>{post.body}</Body>
            <SubTitle>예상 개발 기간</SubTitle>
            <Period>{post.period}</Period>
            <SubTitle>진행 상황</SubTitle>
            <Situation>{post.done}</Situation>
            <ButtonWrapper>
              {isWriter && post.recruit_state && (
                <Button onClick={() => setIsCheckPopUp(true)} color="orange">
                  모집 완료
                </Button>
              )}
              {!isWriter && post.recruit_state && (
                <>
                  <Button color="orange">신청하기</Button>
                  <Button color="gray" outline style={{ marginLeft: "2rem" }}>
                    문의하기
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
        <CheckText>모집을 완료하시겠습니까?</CheckText>
        <SubText>모집 완료 시 수정이 불가능합니다.</SubText>
        <PopUpBtnWrapper>
          <Button color="gray" onClick={() => setIsCheckPopUp(false)}>
            취소
          </Button>
          <Button
            color="orange"
            style={{ marginLeft: "1rem" }}
            onClick={updateRecruitState}
          >
            확인
          </Button>
        </PopUpBtnWrapper>
      </PopUp>
      <PopUp
        isVisible={isRemovePopUp}
        width={"30rem"}
        height={"13rem"}
        setIsPopUp={setIsRemovePopUp}
      >
        <CheckText>게시물을 삭제하시겠습니까?</CheckText>
        <SubText>삭제된 게시물은 복구할 수 없습니다.</SubText>
        <PopUpBtnWrapper>
          <Button color="gray" onClick={() => setIsRemovePopUp(false)}>
            취소
          </Button>
          <Button
            color="orange"
            style={{ marginLeft: "1rem" }}
            onClick={removePost}
          >
            확인
          </Button>
        </PopUpBtnWrapper>
      </PopUp>
    </PageWrapper>
  );
};

export default DevoardDetail;