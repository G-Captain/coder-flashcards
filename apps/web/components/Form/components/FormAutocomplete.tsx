import AppAutocomplete, { Props } from '../../AppAutocomplete/AppAutocomplete';
import withController from './withController';

const FormAutocomplete: React.FC<Props> = ({ fullWidth, ...props }: Props) =>
  withController({ fullWidth, ...props } as Props)(AppAutocomplete);

export default FormAutocomplete;
