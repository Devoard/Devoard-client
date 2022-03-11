import styled, { css } from "styled-components";
import { IoIosClose } from "react-icons/io";

const PopUpBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  border-radius: 0.7rem;
  padding: 2rem;
  box-sizing: border-box;
  position: relative;
  ${(props) => {
    return css`
      width: ${props.width};
      height: ${props.height};
    `;
  }}
  .icon {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
`;

const PopUp = ({ children, isVisible, setIsPopUp, width, height }) => {
  if (!isVisible) return null;

  return (
    <PopUpBackground>
      <PopUpWrapper width={width} height={height}>
        <IoIosClose
          className="icon"
          size="40"
          onClick={() => {
            setIsPopUp(false);
          }}
        />
        {children}
      </PopUpWrapper>
    </PopUpBackground>
  );
};

export default PopUp;
