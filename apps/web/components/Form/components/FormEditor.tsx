import { Props as EditorProps } from '../../Editor/Editor';
import withController from './withController';
import dynamic from 'next/dynamic';

type Props = EditorProps;

const ISSERVER = typeof window === 'undefined';

let Editor = null;
if (!ISSERVER) {
  Editor = dynamic(() => import('../../../components/Editor/Editor'));
}

const FormEditor = ({ ...props }: Props) =>
  withController({ ...props } as any)(Editor);

export default FormEditor;
