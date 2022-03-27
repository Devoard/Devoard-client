import { useEffect } from 'react';
import styled from 'styled-components';
import importantData from '../assets/data/important.json';

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

const ImportantContents = ({ important, setImportant }) => {
  return (
    importantData.text.map((v, i) => (
      <CheckBoxWrapper key={i} style={{marginLeft: '1rem'}}>
        <CheckBox 
          id={v}
          checked={important[importantData.value[i]]}
          onChange={(e) => {
            setImportant({
              ...important,
              [importantData.value[i]]: e.target.checked
            })
          }}
        /><Label htmlFor={v}>{v}</Label>
      </CheckBoxWrapper>
    ))
  )
}

export default ImportantContents;