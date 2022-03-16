import styled from 'styled-components';
import Button from '../components/Button';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const Background = styled.div`
  @media (min-width: 1400px) {
    padding: 3rem;
  }
  background: white;
  border-radius: 0.7rem;
  padding: 2rem;
`;

export const UserImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export const UserImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;

`;

export const ImgInput = styled.input`
  display: none;
`;

export const UploadButton = styled(Button)`
  width: 15rem;
  margin-top: 1rem;
`;

export const DeleteButton = styled(Button)`
  width: 15rem;
  margin-top: 1rem;
`;

const Wrapper = styled.div`
  margin-top: 2rem;
`;
export const Text = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
export const Input = styled.input`
  border: none;
  color: #3A3D3E;
  border-bottom: 2px solid gray;
  outline: none;
  font-size: 1.1rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  resize: none;
  outline: none;
  border-radius: 1rem;
  border: 2px solid gray;
  font-size: 1.1rem;
  font-family: var(--font-body);
`;

export const UserNameWrapper = styled(Wrapper)`
  margin-top: 3rem;
`;

export const IntroWrapper = styled(Wrapper)``;
export const ContactWrapper = styled(Wrapper)``;
export const PfAddrWrapper = styled(Wrapper)``;

export const DevStackWrapper = styled(Wrapper)``;

export const FieldTextWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

export const DownIcon = styled(IoIosArrowDown)`
  margin: 0 0.5rem;
`;

export const FieldText = styled.div`
  font-size: 1.05rem;
  font-weight: bold;
`;