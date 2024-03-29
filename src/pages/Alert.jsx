import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AlertItem from "../components/Alert/AlertItem";

import Title from "../components/common/Title";
import AlertAPI from "../lib/api/AlertAPI";
import { setActivePage } from "../modules/user";
const AlertWrap = styled.div`
  width: 100%;
`;

const Wrap = styled.div`
  margin: 0 auto;
  width: 70%;
  height: 660px;
  background-color: #fff;
  border-radius: 0.7rem;
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

const ListBox = styled.div`
  width: 88%;
  margin: 30px 0;
`;

const Alert = () => {
  const dispatch = useDispatch();
  // const { getAlertList } = useAlert();

  const { loggedUser } = useSelector((state) => state.user);

  const [alertList, setAlertList] = useState([]);

  useEffect(() => {
    dispatch(setActivePage("alert"));
    AlertAPI.getAlertList(loggedUser.id).then((res) => {
      setAlertList(res);
    });
  }, [setActivePage]);

  return (
    <AlertWrap>
      <Title>알림</Title>
      <Wrap>
        <ListBox>
          {alertList?.length===0 && <p>알림이 존재하지 않습니다.🙈</p>}
          {alertList?.map((v, i) => (
            <AlertItem key={i} alert={v} />
          ))}
        </ListBox>
      </Wrap>
    </AlertWrap>
  );
};

export default Alert;
