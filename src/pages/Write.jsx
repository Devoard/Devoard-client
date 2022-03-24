import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostAPI from '../api/PostAPI';
import Title from '../components/Title';
import AddTag from '../components/AddTag';
import PopUp from '../components/PopUp';
import Button from '../components/Button';
import {
  PageWrapper,
  Background,
  Input,
  Text,
  AddBtn,
  StackWrapper,
  ColumnAlignWrapper,
  SelectWrapper,
  FieldText,
  WarningText,
  NumText,
  ComboBox,
  OptGroup,
  Option,
  TagWrapper,
  TextArea,
  TitleWrapper,
  RecruitCntWrapper,
  DetailWrapper,
  PeriodWrapper,
  StateWrapper,
  BtnWrapper,
  PostBtn,
  CheckText,
  PopUpBtnWrapper
} from '../styles/Write';

const Write = () => {
  const [recruitCnt, setRecruitCnt] = useState({
    front_end: "",
    back_end: "",
    android: "",
    ios: "",
    data: "",
    devops: ""
  });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [stacks, setStacks] = useState([]);
  const [period, setPeriod] = useState("");
  const [selectedStack, setSelectedStack] = useState("");
  const [situation, setSituation] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [isWarning, setIsWarning] = useState(false);
  const [isExistStack, setIsExistStack] = useState(false);
  const [isCheckPopUp, setIsCheckPopUp] = useState(false);
  const { loggedUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;


  const getPostData = async() => {
    const post = await PostAPI.getDetailPost(postId);

    setTitle(post.title);
    setBody(post.body);
    setRecruitCnt({
      front_end: post.frontend_cnt,
      back_end: post.backend_cnt,
      android: post.android_cnt,
      ios: post.ios_cnt,
      data: post.data_cnt,
      devops: post.devops_cnt
    });
    setStacks(post.field);
    setSituation(post.done);
    setPeriod(post.period);
  }

  const createPost = async() => { 
    let today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    const date = year + '-' + month + '-' + day;

    await PostAPI.createPost({
      title: title,
      body: body,
      field: stacks,
      frontend_cnt: recruitCnt.front_end,
      backend_cnt: recruitCnt.back_end,
      android_cnt: recruitCnt.android,
      ios_cnt: recruitCnt.ios,
      data_cnt: recruitCnt.data,
      devops_cnt: recruitCnt.devops,
      period: period,
      done: situation,
      recruit_state: true,
      username: loggedUser.id,
      date: date,
    })
    .then(navigate("/devoard"));
  }

  const updatePost = async() => {
    await PostAPI.updatePost(postId, {
      id: postId,
      title: title,
      body: body,
      field: stacks,
      frontend_cnt: recruitCnt.front_end,
      backend_cnt: recruitCnt.back_end,
      android_cnt: recruitCnt.android,
      ios_cnt: recruitCnt.ios,
      data_cnt: recruitCnt.data,
      devops_cnt: recruitCnt.devops,
      period: period,
      done: situation,
    })
    .then(navigate("/devoard"));
  }

  const isExistTag = (selected) => {
    for (let stack of stacks) {
      if (stack === selected)
        return true;
    }

    return false;
  }

  const addStack = () => {
    const selected = selectedStack;
    setSelectedStack(""); 

    if (selected === "") return null;

    if (isExistTag(selected)){
      setIsExistStack(true);
      return null;
    }
    
    setIsExistStack(false);
    setStacks([ ...stacks, selected ])
  }

  const resizeTextArea = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = (14 + e.target.scrollHeight) + "px";
  }

  const checkForm = () => {
    if (title === "" || !isValidRecruitCnt() || body === "" || situation === "")
      setIsWarning(true);
    else
      setIsCheckPopUp(true);
  }


  const isValidRecruitCnt = () => {
    let total = 0;
    for (let cnt of Object.values(recruitCnt)) {
      if (isNaN(cnt)) return false;
      total += cnt;
    }
    
    return (total === 0 ? false : true);
  }


  useEffect(() => {
    const removeStack = () => {
      setStacks(stacks.filter(stack => stack !== selectedTag));
    }

    removeStack();
  }, [selectedTag]);

  useEffect(() => {
    let timer = null;

    timer = setTimeout(()=>{
      setIsExistStack(false);
    }, 3000);

    return (() => {
      clearTimeout(timer);
    })
  }, [isExistStack]);

  useEffect(() => {
    isValidRecruitCnt();
  }, [recruitCnt]);

  useEffect(() => {
    if(postId) getPostData();
  }, [])


  
  return (
    <PageWrapper>
      <Title>모집 글 작성하기</Title>
      <Background>
        <WarningText style={{marginBottom: '2rem'}}>* 은 필수 항목입니다</WarningText>
        <TitleWrapper
          isWarning={isWarning && title === "" ? true : false}
        >
          <Text>* 프로젝트 명</Text>
          <ColumnAlignWrapper
            style={{ width: '65%' }}
          >
            <Input 
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </ColumnAlignWrapper>
          
        </TitleWrapper>
      
        <RecruitCntWrapper
          isWarning={isWarning && !isValidRecruitCnt() ? true : false}
        >
          <Text>* 모집 인원</Text>
          <ColumnAlignWrapper>
            <SelectWrapper>
              <FieldText>Front-end</FieldText>
              <Input 
                value={recruitCnt.front_end}
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, front_end: e.target.value })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            <SelectWrapper>
              <FieldText>Back-end</FieldText>
              <Input 
                value={recruitCnt.back_end}
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, back_end: e.target.value })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            <SelectWrapper>
              <FieldText>Android</FieldText>
              <Input 
                value={recruitCnt.android}
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, android: e.target.value })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            <SelectWrapper>
              <FieldText>IOS</FieldText>
              <Input 
                value={recruitCnt.ios}
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, ios: e.target.value })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            <SelectWrapper>
              <FieldText>Data</FieldText>
              <Input 
                value={recruitCnt.data}
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, data: e.target.value })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            <SelectWrapper>
              <FieldText>Devops</FieldText>
              <Input 
                value={recruitCnt.devops}
                style={{ width: '4%', textAlign: 'center'}}
                placeholder="0"
                onChange={(e)=>setRecruitCnt({ ...recruitCnt, devops: e.target.value })}
              />
              <NumText>명</NumText>
            </SelectWrapper>
            {isWarning && !isValidRecruitCnt() ?
              <WarningText
                style={{ marginTop: '1rem'}}
              >모집 인원은 최소 1명이며, 숫자로 입력해야 합니다
              </WarningText> : ""
            }
          </ColumnAlignWrapper>
        </RecruitCntWrapper>
        <StackWrapper>
          <Text>기술 스택</Text>
          <ColumnAlignWrapper>
            <SelectWrapper>
              <ComboBox 
                id="stack" 
                name="stack"
                value={selectedStack}
                isWarning={isExistStack}
                onChange={(e)=>setSelectedStack(e.target.value)}
              >
                <Option label="-- 선택하세요 --" />
                <OptGroup label="Front-end">
                  <Option value="React">React</Option>
                  <Option value="TypeScript">TypeScript</Option>
                  <Option value="Angular">Angular</Option>
                  <Option value="Vue">Vue</Option>
                  <Option value="Ember">Ember</Option>
                  <Option value="Node">Node</Option>
                  <Option value="Nuxt">Nuxt</Option>
                  <Option value="Next">Next</Option>
                  <Option value="etc">etc</Option>
                </OptGroup>
                <OptGroup label="Back-end">
                  <Option value="Flask">Flask</Option>
                  <Option value="Django">Django</Option>
                  <Option value="Spring">Spring</Option>
                  <Option value="Express">Express</Option>
                  <Option value="Koa">Koa</Option>
                  <Option value="etc">etc</Option>
                </OptGroup>
                <OptGroup label="Android">
                  <Option value="Android">Android</Option>
                </OptGroup>
                <OptGroup label="IOS">
                  <Option value="Swift">Swift</Option>
                  <Option value="Object-C">Object-C</Option>
                  <Option value="etc">etc</Option>
                </OptGroup>
                <OptGroup label="Data">
                  <Option value="Data">Data</Option>
                </OptGroup>
                <OptGroup label="Devops">
                  <Option value="Devops">Devops</Option>
                </OptGroup>
              </ComboBox>
              <AddBtn onClick={addStack}>+ 추가</AddBtn>
            </SelectWrapper>
            {isExistStack ?
            <WarningText>이미 추가된 태그입니다.</WarningText> : ""
            }
            <TagWrapper>
              {stacks &&
                stacks.map((tag, i) => (
                  <AddTag 
                    key={i}
                    setSelectedTag={setSelectedTag}
                  >
                    {tag}
                  </AddTag>
                ))
              }
            </TagWrapper>
          </ColumnAlignWrapper>
        </StackWrapper>
        <DetailWrapper
          isWarning={isWarning && body === "" ? true : false}
        >
          <Text>* 상세 설명</Text>
          <TextArea 
            value={body}
            onChange={(e) => {
              resizeTextArea(e);
              setBody(e.target.value);
            }} 
          />
        </DetailWrapper>
        <PeriodWrapper>
          <Text>예상 개발 기간</Text>
          <TextArea 
            value={period}
            onChange={(e) => {
              resizeTextArea(e);
              setPeriod(e.target.value);
            }} 
          />
        </PeriodWrapper>
        <StateWrapper
          isWarning={isWarning && situation === "" ? true : false}
        >
          <Text>* 진행 상황</Text>
          <ComboBox
            id="situation" 
            name="situation"
            value={situation}
            onChange={(e)=>setSituation(e.target.value)}
          >
            <Option label="-- 선택하세요 --" />
            <Option value="준비 중">준비 중</Option>
            <Option value="진행 중">진행 중</Option>
            <Option value="진행 완료">진행 완료</Option>
          </ComboBox>
        </StateWrapper>
        <BtnWrapper>
          <PostBtn 
            color="orange" 
            large
            style={{marginTop: '2rem'}}
            onClick={checkForm}
          >
            등록하기
          </PostBtn>
        </BtnWrapper>
      </Background>
      <PopUp
        isVisible={isCheckPopUp}
        width={'30rem'}
        height={'13rem'}
        setIsPopUp={setIsCheckPopUp}
      >
        <CheckText>글을 {postId ? '수정' : '등록'}하시겠습니까?</CheckText>
        <PopUpBtnWrapper>
          <Button
            color="gray"
            onClick={()=>setIsCheckPopUp(false)}
          >취소</Button>
          <Button
            color="orange"
            style={{marginLeft: '1rem'}}
            onClick={()=>{
              postId ? updatePost() : createPost()
            }}
          >확인</Button>

        </PopUpBtnWrapper>
      </PopUp>
    </PageWrapper>
  )
}

export default Write;