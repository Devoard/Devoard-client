import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
    height: 24px;
    display: flex;
    color: #fff;
    font-weight: 400;
    font-size: 24px;
    line-height: 100%;
    margin-bottom: 40px;
    &:before{
        content: "";
        width: 8px;
        height: 100%;
        margin-right: 10px;
        background: var(--color-orange);
    }
`;

const Title = ({children}) => {
    return (
        <StyledTitle>
            {children}
        </StyledTitle>
    );
};

export default Title;