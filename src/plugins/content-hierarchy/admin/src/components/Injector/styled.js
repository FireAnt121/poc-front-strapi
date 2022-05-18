import styled from 'styled-components';

export const Wrapper = styled.div`
  ${({ level }) => {
    // Indent for all levels except the root level.
    if ( level ) {
      return `margin-left: 2.5rem;`;
    }
  }}

  padding-top: 1rem;
  position:relative;
  z-index: 1;


  > div {
    position: relative;
    z-index: 2;
    & > div {
      & >div {
        background: #e8e8fd;
        margin-bottom: 0.5rem;
        padding: 5px 10px 5px 10px;
        border-radius: 5px;
        color: #271fe0;
        align-items: center;
        justify-content: space-between;

        &.level2{
          margin-left:2rem;
        }
        &.level3{
          margin-left:4rem;
        }
      }
    }
  }

  &::before {
    // width: 6px;
    // background: ${({ theme, level, activeLevel }) => level === activeLevel ? theme.colors.primary600 : theme.colors.primary200};
    // border-radius: ${({ level }) => level ? 0 : '4px'};
    // content: '';
    // position: absolute;
    // top: 0;
    // left: 1rem;
    // bottom: 0;
    // z-index: 1;
  }
`;
