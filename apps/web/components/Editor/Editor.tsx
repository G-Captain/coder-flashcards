import { useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import styled from '@emotion/styled';

interface Props {
  onValueChange?: (string) => void;
}

const Wrapper = styled.div`
  .quill {
    .ql-toolbar {
      border-top-left-radius: 4px !important;
      border-top-right-radius: 4px !important;
    }
    .ql-container {
      border-bottom-left-radius: 4px !important;
      border-bottom-right-radius: 4px !important;
    }
  }
`;

const modules = {
  toolbar: [
    [],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['code-block'],
  ],
};

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'code-block',
];

const Editor = ({ onValueChange }: Props) => {
  const [value, setValue] = useState('');

  const editorChangeHandler = useCallback(
    (content, delta, source, editor) => {
      const purifiedContent: string = DOMPurify.sanitize(content);
      setValue(purifiedContent);
      onValueChange?.(purifiedContent);
    },
    [onValueChange]
  );

  return (
    <Wrapper>
      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
        onChange={editorChangeHandler}
      />

      <div
        dangerouslySetInnerHTML={{
          __html: value,
        }}
      />
    </Wrapper>
  );
};

export default Editor;
