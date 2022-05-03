import styled, { css } from 'styled-components';

const RecruitStateWrapper = styled.div`
  width: 100px;
  height: 25px;
  line-height: 1.6;
  border-radius: 1rem;
  color: var(--color-orange);
  border: 2px solid var(--color-orange);
  font-weight: bold;
  text-align: center;

  ${props =>
    !props.isRecruit &&
    css`
      border: 2px solid gray;
      color: gray;
    `
  }
`;

const RecruitState = ({ isRecruit }) => {
  return (
    <RecruitStateWrapper
      isRecruit={isRecruit}
    >
      {isRecruit === true ? "모집 중" : "모집 완료"}
    </RecruitStateWrapper>
  )
}

export default RecruitState;