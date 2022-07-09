import styled from 'styled-components';

interface CaretProps {
  position: number;
}

export const Caret = styled.div<CaretProps>`
  width: 1ch;
  background-color: #fff;
  height: 20px;
  position: absolute;
  mix-blend-mode: difference;
  left: ${({ position }) => position + 2}ch;
`;
