import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';
import Button from '../components/common/Button';
import { BsBellFill, BsChatSquareDotsFill } from "react-icons/bs";

export const HeaderArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  height: 4.5rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  max-width: 1280px;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
  height: 4.5rem;
  background: linear-gradient(to bottom, rgb(8, 14, 29, 0.8) 90%, transparent);
  z-index: 10;

  transition: 0.3s ease;
  &.hide {
    transform: translateY(-4.5rem);
  }
`;

export const StaticMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Logo = styled.div`
  color: var(--color-orange);
  font-family: var(--font-logo);
  font-size: 2rem;
  cursor: pointer;
`;

export const ProjectMenu = styled.span`
  font-size: 1.2rem;
  font-weight: bolder;
  color: white;
  margin-left: 2.5rem;
  cursor: pointer;

  &:hover { color: ${lighten(0.3, 'gray')};}
  &:active { color: ${darken(0.05, 'gray')};}
`;

export const UserIcon = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 6rem;
  cursor: pointer;
`;


export const UserMenuWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginBtn = styled(Button)``;

export const AlertBtn = styled(BsBellFill)`
  margin-right: 1rem;
  cursor: pointer;
  
  &:hover { fill: ${lighten(0.2, '#FFB200')};}
  &:active { fill: ${darken(0.05, '#FFB200')};}

  ${props =>
    props.color === 'white' &&
    css`
      &:hover { fill: ${lighten(0.3, 'gray')};}
      &:active { fill: ${darken(0.05, 'gray')};}
    `
  }
`;

export const ChatBtn = styled(BsChatSquareDotsFill)`
  margin-right: 1rem;
  padding-top: 0.3rem;
  cursor: pointer;

  &:hover { fill: ${lighten(0.2, '#FFB200')};}
  &:active { fill: ${darken(0.05, '#FFB200')};}

  ${props =>
    props.color === 'white' &&
    css`
      &:hover { fill: ${lighten(0.3, 'gray')};}
      &:active { fill: ${darken(0.05, 'gray')};}
    `
  }
`;