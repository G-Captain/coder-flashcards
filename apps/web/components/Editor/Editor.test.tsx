import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Editor from './Editor';

describe('Editor', () => {
  it(`should cointain code block button`, () => {
    render(<Editor />);
    const buttons = screen.getAllByRole('button');
    const codeBlockButton = buttons.find(
      (butt) => butt.className === 'ql-code-block'
    );
    expect(codeBlockButton).toBeTruthy();
  });
});
