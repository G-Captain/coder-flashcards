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

  it(`should render helper text on error`, async () => {
    render(<Editor error={false} />);
    const helperText = screen.queryByText('Field is required');
    expect(helperText).not.toBeInTheDocument();

    render(<Editor error={true} />);
    const helperText2 = screen.queryByText('Field is required');
    expect(helperText2).toBeInTheDocument();
  });
});
