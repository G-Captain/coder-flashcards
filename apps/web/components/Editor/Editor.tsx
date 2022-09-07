import { useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import styled from '@emotion/styled';
import 'react-quill/dist/quill.snow.css';
import FieldObject from '../../types/FieldObject';
import { FormHelperText } from '@mui/material';

export interface Props {
  defaultValue?: string;
  name?: string;
  fieldObj?: FieldObject;
  error?: boolean;
  onValueChange?: (string) => void;
}
export interface WrapperProps {
  error?: boolean;
  focused?: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  .quill {
    &:hover {
      .ql-toolbar,
      .ql-container {
        ${({ focused, error }) => {
          if (!focused && !error) {
            return 'border: 1px solid black;';
          }
          return '';
        }}
      }
    }
    .ql-toolbar,
    .ql-container {
      ${({ error }) => {
        if (error) {
          return 'border: 1px solid #d32f2f;';
        }
        return '';
      }}
      ${({ focused, theme }) => {
        if (focused) {
          return `margin: -1px; border: 2px solid ${theme.palette.primary.main}`;
        }
        return '';
      }}
    }

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

const StyledFormHelperText = styled(FormHelperText)`
  margin-left: 14px;
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

const Editor = ({ defaultValue, error, fieldObj, onValueChange }: Props) => {
  const [value, setValue] = useState(defaultValue || fieldObj?.value);
  const [focused, setFocused] = useState(false);

  const editorChangeHandler = useCallback(
    (content, delta, source, editor) => {
      setValue(content);
      onValueChange?.(content);
      fieldObj?.onChange(content);
    },
    [fieldObj?.onChange, onValueChange]
  );

  return (
    <Wrapper error={error} focused={focused}>
      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
        onChange={editorChangeHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && (
        <StyledFormHelperText error>Field is required</StyledFormHelperText>
      )}
    </Wrapper>
  );
};

export default Editor;
