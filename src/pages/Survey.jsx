import { useEffect, useState } from "react";
import styled from "styled-components";
import { dataList } from "./surveyData";
import SurveyComp from "../components/SurveyComp";
import Button from "../components/common/Button";
import { useDispatch } from "react-redux";
import { submit_survey } from "../modules/servey";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SurveyPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px auto;
  width: 60%;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  background: #fff;
  border-radius: 50px;
  overflow: hidden;
`;
const ProgressStatus = styled.div`
  height: 100%;
  width: ${(props) => props.status * (100 / 12)}%;
  border-radius: 50px;
  background: var(--color-orange);
`;

const CuntrolBox = styled.div`
  display: flex;
  margin-top: 32px;
  gap: 14px;
`;
const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-family: var(--font-title);
`;

const Survey = () => {
  const [progressRate, setProgressRate] = useState(0);
  const [dataId, setDataId] = useState(1);
  const { loggedUser } = useSelector((state) => state.user);
  const [datas, setDatas] = useState({
    0: loggedUser.id,
    1: "",
    2: [],
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: [],
    9: "",
    10: "",
    11: "",
    12: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setProgressRate(dataId);
  }, [dataId]);

  const onPrevClick = () => {
    if (dataId <= 1) return;
    setDataId((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (dataId === 12) {
      if (window.confirm("설문조사를 완료하시겠습니까?")) {
        dispatch(submit_survey(datas));
        window.alert("전송하였습니다.");
        navigate("/");
      }
    }
    if (dataId >= 12) return;
    setDataId((prev) => prev + 1);
  };

  return (
    <>
      <Title>설문조사</Title>
      <SurveyPage>
        <ProgressBar>
          <ProgressStatus status={progressRate} />
        </ProgressBar>
        {dataList.map((v, i) => {
          if (i + 1 === dataId) {
            return (
              <SurveyComp key={i} data={v} setDatas={setDatas} datas={datas} />
            );
          }
        })}
        <CuntrolBox>
          <Button color="orange" outline onClick={onPrevClick}>
            이전
          </Button>
          <Button color="orange" outline onClick={onNextClick}>
            다음
          </Button>
        </CuntrolBox>
      </SurveyPage>
    </>
  );
};
export default Survey;
