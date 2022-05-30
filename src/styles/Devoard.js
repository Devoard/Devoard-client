import styled from 'styled-components';
import { GoTriangleDown } from 'react-icons/go';
import { AiOutlineSearch } from 'react-icons/ai';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const ProjectWrapper = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 30rem)
  }
  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr)
  }
  @media (max-width: 780px) {
    grid-template-columns: 30rem
  }
  
  margin: 0 auto;
  margin-top: 2rem;
`;

export const SortingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  z-index: 5;
`;

export const ComboBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 8rem;
  height: 1.8rem;
  border-radius: 0.3rem;
  background: white;
  margin-bottom: 0;
  cursor: pointer;
`;

export const SelectedText = styled.span``;

export const DownIcon = styled(GoTriangleDown)`
  position: absolute;
  right: 0;
  margin-right: 0.3rem;
  fill: black;
`;

export const MenuWrapper = styled.div`
  position: absolute;
  top: 2.2rem;
  right: 0;
  box-shadow: 0px 0px 12px #444444;
`;

export const Menu = styled.div`
  line-height: 2.7;
  color: black;
  width: 8rem;
  height: 2.5rem;
  background: white;
  text-align: center;
  font-size: 0.95rem;

  &:hover { background: lightgray };
`;

export const Search = styled.div`
  display: inline-block;
  box-sizing: border-box;
  height: 2rem;
  width: 15rem;
  border-radius: 0.3rem;
  background: white;
  padding: 0.1rem;
  position: relative;
`;

export const SearchInput = styled.input`
  &:focus { outline: none };
  height: 1.5rem;
  width: 12rem;
  border: none;
  position: absolute;
  top: 0.17rem;
  left: 0.5rem;
  font-size: 1.1rem;
  font-family: var(--font-body);
`;

export const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  right: 0.3rem;
  top: 0.2rem;
  cursor: pointer;

  &:hover { opacity: 0.7; }
`;

