import { useEffect, useState } from "react";
import styled from "styled-components";

const Question = styled.h1`
  color: #fff;
  line-height: 1.3;
  font-size: 24px;
`;

const Answer = styled.p`
  background: ${(props) => (props.select ? "var(--color-orange)" : "#fff")};
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  font-size: 20px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s;
  margin: 10px;
  &:hover {
    background: var(--color-orange);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  outline: none;
  padding: 10px;
  box-sizing: border-box;
`;

const RadioForm = styled.form`
  display: flex;
  gap: 28px;
  margin: 30px;
  & > label {
    color: #fff;
  }
`;

const SurveyComp = ({ data, setDatas, datas }) => {
  const [selectArr, setSelectArr] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (selectArr.length > 0) setDatas({ ...datas, [id]: selectArr });
  }, [selectArr]);

  const onTextChange = (e) => {
    setDatas({ ...datas, [e.target.dataset.id]: e.target.value });
  };

  const onFirstAnswer = (e) => {
    setDatas({ ...datas, [e.target.dataset.id]: e.target.innerText });
  };

  const onSelect = (e) => {
    setDatas({ ...datas, [e.target.dataset.id]: e.target.innerText });
  };

  const onSelectMulti = (e) => {
    if (selectArr.includes(e.target.innerText)) {
      const arr = selectArr.filter((v, i) => v !== e.target.innerText);
      setSelectArr(arr);
    } else {
      setSelectArr((prev) => prev.concat(e.target.innerText));
      setId(e.target.dataset.id);
    }
  };

  return (
    <>
      <Question>{data.q}</Question>

      {data.id === 1 &&
        data.a.map((v, i) => {
          if (datas[data.id] === v)
            return (
              <Answer
                key={i}
                select={true}
                onClick={onFirstAnswer}
                data-id={data.id}
              >
                {v}
              </Answer>
            );
          else
            return (
              <Answer key={i} onClick={onFirstAnswer} data-id={data.id}>
                {v}
              </Answer>
            );
        })}

      {data.id === 2 &&
        data.a[datas[1]] &&
        data.a[datas[1]].map((v, i) => {
          if (datas[data.id].includes(v))
            return (
              <Answer
                key={i}
                select={true}
                onClick={onSelectMulti}
                data-id={data.id}
              >
                {v}
              </Answer>
            );
          else
            return (
              <Answer key={i} onClick={onSelectMulti} data-id={data.id}>
                {v}
              </Answer>
            );
        })}

      {data.id === 6 &&
        data.a.map((v, i) => {
          if (datas[data.id].includes(v))
            return (
              <Answer
                key={i}
                select={true}
                onClick={onSelectMulti}
                data-id={data.id}
              >
                {v}
              </Answer>
            );
          else
            return (
              <Answer key={i} onClick={onSelectMulti} data-id={data.id}>
                {v}
              </Answer>
            );
        })}

      {data.id > 2 &&
        data.id < 6 &&
        data.a.map((v, i) => {
          if (datas[data.id] === v)
            return (
              <Answer
                key={i}
                select={true}
                onClick={onSelect}
                data-id={data.id}
              >
                {v}
              </Answer>
            );
          else
            return (
              <Answer key={i} onClick={onSelect} data-id={data.id}>
                {v}
              </Answer>
            );
        })}

      {data.id > 6 && data.id !== 8 && (
        <TextArea
          data-id={data.id}
          onChange={onTextChange}
          value={datas[data.id]}
        />
      )}

      {data.id === 8 && (
        <RadioForm>
          <label>
            <input type="radio" name="job" value="학생" data-id={data.id} />
            학생
          </label>
          <label>
            <input
              type="radio"
              name="job"
              value="취업준비생"
              data-id={data.id}
            />
            취업준비생
          </label>
          <label>
            <input type="radio" name="job" value="직장인" data-id={data.id} />
            직장인
          </label>
        </RadioForm>
      )}
    </>
  );
};
export default SurveyComp;
