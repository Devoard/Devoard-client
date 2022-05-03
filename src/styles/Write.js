import styled, { css } from 'styled-components';
import Button from '../components/common/Button';

const warningStyles = css`
  ${props => 
    props.isWarning &&
    css`
      //${Text} { color: #d36262 };
      ${Input} { border: 2px solid #d36262 };
      ${TextArea} { border: 2px solid #d36262 };
      ${ComboBox} { border: 2px solid #d36262 };
    `
  }
`;

export const PageWrapper = styled.div`
  margin: 2rem 0;
`;

export const Background = styled.div`
  @media (min-width: 1400px) {
    padding: 3rem;
  }
  background: white;
  border-radius: 0.7rem;
  padding: 2rem;
`;

// common

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const Text = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 2rem;
  margin-top: 0.3rem;
  width: 20%;
  text-align: right;

  ${props =>
    props.isWarning &&
    css`
      color: #d36262;
    `
  }
`;

export const Input = styled.input`
  height: 1.4rem;
  outline: none;
  border-radius: 1rem;
  padding: 0.2rem 1rem;
  border: 2px solid gray;
  font-size: 1.1rem;
  font-family: var(--font-body);
  margin-bottom: 0.5rem;
  ::placeholder { color: #c2c2c2; }
`;

export const ComboBox = styled.select`
  width: 10rem;
  height: 1.8rem;
  padding: 0.2rem 0.5rem;
  margin-right: 1rem;
  border-radius: 1rem;
  border: 2px solid gray;
  font-family: var(--font-body);
  font-size: 1rem;
  outline: none;
`;

export const OptGroup = styled.optgroup``;

export const Option = styled.option``;

export const AddBtn = styled.div`
  padding: 0.2rem 1rem;
  border-radius: 1.2rem;
  background: var(--color-orange);
  color: white;
  cursor: pointer;

  &:hover {opacity: 0.8;}
  &:active {opacity: 1;}
`;

export const Tag = styled.div``;

export const ColumnAlignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 65%;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;

  * {margin-top: 0.5rem; margin-right: 0.7rem;}
`;

export const TextArea = styled.textarea`
  width: 65%;
  padding: 1rem;
  resize: none;
  outline: none;
  border-radius: 1rem;
  border: 2px solid gray;
  font-size: 1.1rem;
  font-family: var(--font-body);
`;

export const FieldText = styled.div`
  width: 30%;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const WarningText = styled.div`
  margin-top: 0.3rem;
  color: #d36262;
  font-weight: bold;
`;


// title

export const TitleWrapper = styled(Wrapper)`
  ${warningStyles}
`;


// recruitCnt

export const RecruitCntWrapper = styled(Wrapper)`
  ${warningStyles}
`;

export const NumText = styled.span`
  margin-left: 0.4rem;
  margin-right: 1rem;
  font-weight: bold;
`;


// Stack

export const StackWrapper = styled(Wrapper)``;


// Detail

export const DetailWrapper = styled(Wrapper)`
  ${warningStyles}
`;

// Period

export const PeriodWrapper = styled(Wrapper)``;

// State

export const StateWrapper = styled(Wrapper)`
  ${warningStyles};
`;


export const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const PostBtn = styled(Button)`
  height: 2.5rem;
  padding: 0 2rem;
  font-size: 1.35rem;
`;


// checkPopUp

export const CheckText = styled.div`
  font-size: 1.4rem;
  font-family: var(--font-title);
  margin-top: 3rem;
`;

export const PopUpBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 4rem;
`;