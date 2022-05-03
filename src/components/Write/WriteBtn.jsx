import styled from 'styled-components';
import { BsPencilSquare } from 'react-icons/bs';

const WriteIcon = styled(BsPencilSquare)`
  opacity: 0.95;
  &:hover { };
  &:active { opacity: 1 };
`;

const WriteBtnWrapper = styled.div`
  box-sizing: border-box;
  width: 4rem;
  height: 4rem;
  background: white;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  border-radius: 50%;
  box-shadow: 0px 0px 12px #444444;
  padding: 1rem;
  cursor: pointer;

  &:hover {${WriteIcon} {opacity: 0.75}};
  &:active {${WriteIcon} {opacity: 1}};
`;



const WriteBtn = ({onClick}) => {
  return (
    <WriteBtnWrapper onClick={onClick}>
      <WriteIcon size='30'/>
    </WriteBtnWrapper>
  );
}

export default WriteBtn;