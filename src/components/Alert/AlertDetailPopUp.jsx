import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAlert } from "../../hooks/useAlert";
import AlertAPI from "../../lib/api/AlertAPI";
import PopUp from "../common/PopUp";

const Content = styled.div`
  overflow-y: auto;
  height: 80%;
  width: 88%;
`;
const Title = styled.h4`
  margin: 30px 0 60px;
  font-size: 24px;
`;
const Info = styled.p`
  margin: 10px 0;
`;

const AlertDetailPopUp = ({ alertId, openDetail, setOpenDetail }) => {
  const [alert, setAlert] = useState();
  // const { getAlertDetail } = useAlert();

  useEffect(() => {
    AlertAPI.getAlertDetail(alertId).then((res) => {
      setAlert(res);
    });
  }, []);

  return (
    <PopUp
      width={"50%"}
      height={"70%"}
      isVisible={openDetail}
      setIsPopUp={setOpenDetail}
    >
      <Content>
        <Title>{alert && alert.title}</Title>
        <Info>{alert && alert.data} </Info>
        <Info>연락처: {alert && alert.team_master.user_connect}</Info>
        <Info>Github 아이디: {alert && alert.team_master.user_git_id}</Info>
      </Content>
    </PopUp>
  );
};

export default AlertDetailPopUp;
