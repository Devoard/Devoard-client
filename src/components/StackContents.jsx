import styled, { css } from 'styled-components';
import devStack from '../assets/data/devStack.json';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const FieldWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  flex-direction: column;
`;

const FieldTextWrapper = styled.div`
  display: flex;
  margin-bottom: 0.2rem;
`;

const DownIcon = styled(IoIosArrowDown)`
  margin: 0 0.5rem;
  cursor: pointer;
`;

const UpIcon = styled(IoIosArrowUp)`
  margin: 0 0.5rem;
  cursor: pointer;
`;

const Field = styled.div`
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
  &:hover { opacity: 0.8; }
`;

const StackWrapper = styled.div`
  display: flex;
  margin-top: 0.2rem;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
  margin-top: 0.2rem;
`;

const CheckBox = styled.input.attrs({
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

const Label = styled.label`
  font-size: 1.05rem;
  width: 6rem;
  margin-right: 4rem;
  cursor: pointer;
  &:hover { opacity: 0.8; }
`;

export const Box = styled.div`
  padding: 0 0.6rem;
  border: 1.5px solid gray;
  text-align: center;
  height: 1.45rem;
  font-size: 1.1rem;
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



const StackContents = ({ field, isFieldOpen, setIsFieldOpen, stackLevel, setStackLevel }) => {
  const onChangeLevel = (level, i) => {
    const newArray = [...stackLevel[field].slice(0, i), level, ...stackLevel[field].slice(i + 1, stackLevel[field].length)]
    setStackLevel({ ...stackLevel, [field]: newArray });
  }

  const onToggleCheck = (i) => {
    stackLevel[field][i] === 0 ? onChangeLevel(3, i) : onChangeLevel(0, i)
  }
  
  return (
    <FieldWrapper>
      <FieldTextWrapper
        onClick={() => {
          setIsFieldOpen({
            ...isFieldOpen,
            [field]: !isFieldOpen[field]
          })
        }}
      >
        {isFieldOpen[field] ? <DownIcon /> : <UpIcon />}
        <Field>{devStack[field].text}</Field>
      </FieldTextWrapper>
      {isFieldOpen[field] && 
        devStack[field].stack.map((stack, i) => (
          <StackWrapper key={i}>
            <CheckBoxWrapper>
              <CheckBox 
                id={stack} 
                onClick={() => {onToggleCheck(i)}}
              /><Label htmlFor={stack}>{stack}</Label>
            </CheckBoxWrapper>
            {stackLevel[field][i] !== 0 &&
            <LevelBox>
              <Box
                isChecked={stackLevel[field][i] === 3 ? true : false}
                onClick={() => {onChangeLevel(3, i)}}
              >상</Box>
              <Box
                isChecked={stackLevel[field][i] === 2 ? true : false}
                onClick={() => {onChangeLevel(2, i)}}
              >중</Box>
              <Box
                isChecked={stackLevel[field][i] === 1 ? true : false}
                onClick={() => {onChangeLevel(1, i)}}
              >하</Box>
            </LevelBox>}
          </StackWrapper>
        ))}
    </FieldWrapper>
  )
}

export default StackContents;