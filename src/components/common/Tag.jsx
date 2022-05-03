import styled from 'styled-components';

const TagWrapper = styled.div`
  display: inline-block;
  padding: 0 0.9rem;
  height: 1.4rem;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  background: lightgray;
  color: black;
`;

const Tag = ({ children }) => {
  return (
    <TagWrapper>
      {children}
    </TagWrapper>
  )
};

export default Tag; 