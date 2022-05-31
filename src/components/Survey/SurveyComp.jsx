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

  const onJobchange = (e) => {
    setDatas({ ...datas, [e.target.dataset.id]: e.target.value });
  };

  const renderSwitch = () => {
    switch (data.id) {
      case 1:
      case 2:
      case 4:
        return (
          <TextArea
            data-id={data.id}
            onChange={onTextChange}
            value={datas[data.id]}
          />
        );
      case 3:
        return (
          <RadioForm>
            {data.a.map((v, i) => {
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="job"
                    value={i}
                    data-id={data.id}
                    checked={datas[data.id] === String(i)}
                    onChange={onJobchange}
                  />
                  {v}
                </label>
              );
            })}
          </RadioForm>
        );
      case 5:
        return data.a.map((v, i) => {
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
        });
      case 6:
        return (
          data.a[datas[data.id - 1]] &&
          data.a[datas[data.id - 1]].map((v, i) => {
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
          })
        );
      case 7:
      case 8:
      case 10:
        return data.a.map((v, i) => {
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
        });
      case 9:
        return data.a.map((v, i) => {
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
        });
      default:
        return null;
    }
  };

  return (
    <>
      <Question>{data.q}</Question>

      {renderSwitch()}
    </>
  );
};
export default SurveyComp;
