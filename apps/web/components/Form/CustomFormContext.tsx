import { createContext, useMemo } from 'react';

import { isFieldRequired } from './utils/Form.utils';

interface ContextProps {
  children: React.ReactNode;
  schema: any;
}

type ICustomFormContext = {
  isRequired: (fieldName: string) => boolean;
};

const initialCustomFormContext = {
  isRequired: () => false,
};

const CustomFormContext = createContext<ICustomFormContext>(
  initialCustomFormContext
);

const CustomFormProvider = ({ children, schema }: ContextProps) => {
  const contextValueObj = useMemo(
    () => ({ isRequired: isFieldRequired(schema) }),
    [schema]
  );

  return (
    <CustomFormContext.Provider value={contextValueObj}>
      {children}
    </CustomFormContext.Provider>
  );
};
export { CustomFormContext, CustomFormProvider };
