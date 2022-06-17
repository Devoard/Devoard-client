import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <Background>
      <Spinner />
    </Background>
  )
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Background = styled.div`
  ${({ theme }) => theme.common.flexCenter };
  width: 100%;
  height: 100vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 7px solid gray;
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 1.2s linear infinite;
`;

export default Loading;