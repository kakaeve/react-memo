import React from 'react';
import styled from 'styled-components';

const Box = styled.div<{ selcted?: boolean }>`
  width: 100%;
  height: fit-content;
  padding: 8px 15px;
  border-radius: 5px;
  border-bottom: ${props => (props.selcted ? 'none' : '1px solid #e9e9e9')};
  margin: 5px 0;
  user-select: none;
  cursor: pointer;
  background-color: ${props => (props.selcted ? '#ffe48b' : '#fff')};
`;

const MemoTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #2c2c2c;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const MemoContent = styled.div`
  font-size: 0.8rem;
  color: #8b8b8b;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export default function MemoItem({
  id,
  preview,
  create_at,
  selected,
}: {
  id: string;
  preview: string;
  create_at: string;
  selected: boolean;
}) {
  return (
    <Box selcted={selected}>
      <MemoTitle>{preview}</MemoTitle>
      <MemoContent>{new Date(create_at).toLocaleString('ko')}</MemoContent>
      <MemoContent>{preview}</MemoContent>
    </Box>
  );
}
