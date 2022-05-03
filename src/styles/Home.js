import styled from "styled-components";
import Button from '../components/common/Button';

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 5rem;
`;

export const RecruitDisplayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 400px;
`;

export const RecruitDisplayText = styled.div`
  font-size: 2.8rem;
  color: white;
  text-align: center;
  line-height: 1.3;
`;

export const RecruitCnt = styled.span`
  display: inline-block;
  font-size: 3.1rem!important;
  color: var(--color-orange);
  font-weight: bold;
`;

export const RecruitBtnWrapper = styled.div`
  margin-top: 2rem;
`;

export const ApplyBtn = styled(Button)`
  margin-right: 3rem;
  height: 2.5rem;
  padding: 0 2rem;
  font-size: 1.35rem;
`;

export const RecruitBtn = styled(Button)`
  height: 2.5rem;
  padding: 0 2rem;
  font-size: 1.35rem;
`;

export const IntroTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

export const IntroText = styled.div`
  color: white;
  font-size: 2rem;
`

export const PopularTeamWrapper = styled.div`
  width: 100%;
  height: 400px;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  text-align: center;
`;

export const PopularTeamText = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  text-align: left;
`;

export const ProjectDetailWrapper = styled.div`
  padding: 1rem 0;
  overflow: scroll;
  white-space: nowrap;
  width: 100%;
  position: absolute;

  &::-webkit-scrollbar{ display:none; }
`;

export const MoreProjectBtn = styled(Button)`
  margin-top: 23rem;
`;