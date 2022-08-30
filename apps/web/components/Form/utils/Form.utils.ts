const isFieldRequired = (schema) => {
  const requiredFields: string[] = [];

  if (schema.fields) {
    for (const key in schema.fields) {
      if (Object.prototype.hasOwnProperty.call(schema.fields, key)) {
        if (schema.fields[key].exclusiveTests?.required === true) {
          requiredFields.push(key);
        }
      }
    }
  }

  const isRequired = (fieldName: string) => requiredFields.includes(fieldName);

  return isRequired;
};

export { isFieldRequired };
