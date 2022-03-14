import React from 'react';
import { useSelector } from 'react-redux';
import { MemoListSelector } from 'store/memo/selectors';
import styled from 'styled-components';
import MemoItem from '../Item';

const List = styled.div`
  width: 300px;
  height: calc(100vh - 60px);
  border-right: 1px solid #e9e9e9;
  padding: 0 10px;

  @media (max-width: 687px) {
    margin-left: -200px;
    transition: 0.2s;

    &:hover {
      margin-left: 0;
    }
  }
`;

export default function MemoList() {
  const memoList = useSelector(MemoListSelector);

  return (
    <List className="List">
      {memoList.map(memo => (
        <MemoItem
          id={memo.id}
          create_at={memo.create_at}
          selected={memo.selected}
          preview={memo.preview}
          content={memo.content}
        />
      ))}
    </List>
  );
}
