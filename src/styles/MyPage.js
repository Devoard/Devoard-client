import styled, { css } from 'styled-components';
import Button from '../components/Button';

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

export const DevStackWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
  margin-top: 0.2rem;
`;

export const CheckBox = styled.input.attrs({
  type: 'checkbox'
})
`
  cursor: pointer;
  margin-right: 1rem;
  outline: none;
  &:checked {
    background: var(--color-orange);
  }
`;

export const Label = styled.label`
  font-size: 1.05rem;
  width: 6rem;
  margin-right: 4rem;
  cursor: pointer;
  &:hover { opacity: 0.8; }
`;

export const ExperienceWrapper = styled(Wrapper)`
  display: flex;
`;

export const ImportantWrapper = styled(Wrapper)``;


export const Box = styled.div`
  padding: 0 0.6rem;
  border: 1.5px solid gray;
  text-align: center;
  height: 1.45rem;
  margin-left: -0.1rem;
  cursor: pointer;

  ${props =>
    props.isChecked &&
    css`
      border: 2px solid var(--color-orange);
      z-index: 1;
    `
  }

  &:hover { opacity: 0.8; }
`;

export const LevelBox = styled.div`
  display: flex;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  * {
    margin: 0 0.5rem;
  }
`;