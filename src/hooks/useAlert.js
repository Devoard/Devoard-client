import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

export function useAlert() {
  const headers = {
    Authorization: `Token ${token}`,
  };

  const getAlertList = async (userId) => {
    const response = await axios.get(
      "http://localhost:8000/alter/alter_list/",
      {
        params: { username: userId },
        headers,
      }
    );
    const data = await response.data;
    // const data = [
    //   { id: 3, data: "저희 프로젝트에 초대합니다.", devoard_data: "tq" },
    //   { id: 4, data: "아쉽게도 같이 하실 수 없습니다.", devoard_data: "tq" },
    // ];
    return data;
  };

  const getAlertDetail = async (alertId) => {
    const response = await axios.get("http://localhost:8000/alter/detail/", {
      params: { id: alertId },
      headers,
    });
    const data = await response.data;
    // const data = {
    //   id: 3,
    //   user: {
    //     username: "Zy0ung",
    //     user_git_id: "Zy0young",
    //     user_connect: "Zy0young@gmail.com",
    //   },
    //   title: "프로젝트 지원 결과 안내",
    //   data: "프로젝트에 초대합니다 연락 바랍니다.",
    //   team_master: {
    //     username: "Zy0young",
    //     user_git_id: "dahye@gmail.com",
    //     user_connect: "dahye@naver.com",
    //   },
    //   devoard_data: "tq",
    // };
    return data;
  };

  return {
    getAlertList,
    getAlertDetail,
  };
}
