import AppTextField, {
  Props as AppTextFieldProps,
} from '../../AppTextField/AppTextField';
import withController from './withController';

type Props = AppTextFieldProps;

const FormTextField = ({ fullWidth = true, onKeyPress, ...props }: Props) =>
  withController({ fullWidth, onKeyPress, ...props } as any)(AppTextField);

export default FormTextField;
