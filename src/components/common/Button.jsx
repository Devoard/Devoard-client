import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';


const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      border: none;

      ${props =>
        !props.outline &&
        css`
        &:hover { background: ${lighten(0.1, selected)};}
        &:active { background: ${darken(0.05, selected)};}
        `
      }

      
      ${props => 
        props.outline && 
        css`
          color: ${selected};
          background: none;
          border: 2px solid ${selected};

          &:hover { 
            border-color: ${lighten(0.1, selected)};
            color: ${lighten(0.05, selected)}
          };}
          &:active { 
            border-color: ${darken(0.05, selected)};
            color: ${darken(0.05, selected)}
          }
        `
      }
    `;
  }}
`;

const StyledButton = styled.button`
  background: transparent;
  color: white;
  height: 2.125rem;
  font-family: var(--font-title);
  font-size: 1.125rem;
  line-height: 1;
  padding: 0 1.5rem;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;

  ${colorStyles}
`;




const Button = ({ children, color, outline, ...rest }) => {
  return (
    <StyledButton
      color={color}
      outline={outline}
     {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default Button;