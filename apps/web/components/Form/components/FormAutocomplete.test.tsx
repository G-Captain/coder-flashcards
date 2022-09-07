import { render, screen, waitFor } from '@testing-library/react';
import Form from '../Form';
import FormAutocomplete from './FormAutocomplete';
import * as yup from 'yup';
import FormButton from './FormButton';
import userEvent from '@testing-library/user-event';

describe('FullCard', () => {
  const schema = yup.object().shape({
    option: yup.object().required('Field is required').nullable(true),
  });

  const options = [{ value: 'option1', label: 'Option 1' }];

  it('should display Option 1 if option1 is defaultValue', () => {
    render(
      <Form schema={schema}>
        <FormAutocomplete
          defaultValue={options[0]}
          options={options}
          name={'option'}
        />
      </Form>
    );
    const defaultValue = screen.getByDisplayValue('Option 1');

    expect(defaultValue).toBeInTheDocument();
  });

  it('should display error helper text if no option selected upon submit', async () => {
    render(
      <Form schema={schema}>
        <FormAutocomplete options={options} name={'option'} />

        <FormButton onClick={() => undefined} size="large" color="primary">
          Save
        </FormButton>
      </Form>
    );

    const helperText = screen.queryByText('Field is required');
    expect(helperText).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    await waitFor(() => {
      const helperText2 = screen.queryByText('Field is required');
      expect(helperText2).toBeInTheDocument();
    });
  });
});

export default FormAutocomplete;
