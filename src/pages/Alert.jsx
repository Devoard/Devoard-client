import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AlertItem from "../components/Alert/AlertItem";

import Title from "../components/common/Title";
import { useAlert } from "../hooks/useAlert";
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
  const { getAlertList } = useAlert();

  const { loggedUser } = useSelector((state) => state.user);

  const [alertList, setAlertList] = useState([]);

  useEffect(() => {
    dispatch(setActivePage("alert"));
    getAlertList(loggedUser.id).then((res) => {
      setAlertList(res);
    });
  }, [setActivePage]);

  return (
    <AlertWrap>
      <Title>알림</Title>
      <Wrap>
        <ListBox>
          {alertList.map((v, i) => (
            <AlertItem key={i} alert={v} />
          ))}
          <AlertItem />
          <AlertItem />
        </ListBox>
      </Wrap>
    </AlertWrap>
  );
};

export default Alert;
