import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import Block from 'app/components/Block';
import { useDispatch, useSelector } from 'react-redux';
import { useMemoSlice } from 'store/memo';
import { SelectedMemoListSelector } from 'store/memo/selectors';

const Box = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding: 0 0 0 10px;
  overflow: auto;

  & * {
    font-family: 'Noto Sans KR' !important;
    letter-spacing: -0.2px;
  }

  & .ql-container.ql-snow {
    border: 0 !important;
  }
`;

const MemoDate = styled.div`
  font-size: 0.85em;
  letter-spacing: -0.3px;
  color: #8b8b8b;
  text-align: center;
`;

export default function MemoEditor() {
  const { MemoActions } = useMemoSlice();
  const dispatch = useDispatch();
  const selectedMemo = useSelector(SelectedMemoListSelector);

  const [value, setValue] = React.useState('');

  const EditorRef = React.useRef<ReactQuill>();

  React.useEffect(() => {
    setValue(selectedMemo !== undefined ? selectedMemo.content : '');
  }, [selectedMemo]);

  return (
    <Box>
      <Block marginTop="5px" />
      <MemoDate>
        {new Date(selectedMemo?.create_at ?? '').toLocaleDateString()}
      </MemoDate>
      <ReactQuill
        theme="snow"
        value={value}
        ref={element => {
          if (element !== null) {
            EditorRef.current = element;
          }
        }}
        onChange={content => {
          setValue(content);
          dispatch(
            MemoActions.saveMemo({
              content: content,
              preview:
                EditorRef.current !== undefined
                  ? EditorRef.current.getEditor().getText()
                  : '',
            }),
          );
        }}
        style={{ border: 'none' }}
        modules={{
          toolbar: {
            container: '#toolbar',
          },
        }}
        formats={['bold', 'size', 'header', 'image', 'list', 'link']}
      />
    </Box>
  );
}
