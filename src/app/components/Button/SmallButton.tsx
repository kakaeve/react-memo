import React from 'react';
import styled from 'styled-components';

const RoundBox = styled.button`
  width: 36px;
  min-width: 32px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;

  border: none;
  outline: 0;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
  & svg {
    fill: #646464;
  }
`;

export default function SmallButton({
  className,
  value,
  onClick,
  Icon,
}: {
  className?: string;
  value?: string;
  onClick?: () => void;
  Icon: () => JSX.Element;
}) {
  return (
    <RoundBox onClick={onClick} className={className} value={value}>
      <Icon />
    </RoundBox>
  );
}
