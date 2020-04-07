import React from 'react';
import { Field } from 'formik';
import { InputFieldTemplate } from '../../pages/form/create.d';

interface InputProps {
  index: number;
  fieldData: InputFieldTemplate;
}

const Input: React.FC<InputProps> = ({
  index,
  fieldData
}: InputProps): JSX.Element => (
  <div style={{ margin: '10px 0', border: '1px solid #333' }}>
    <p>tag: input</p>
    <p>
      {'type: '}
      <Field name={`fields.${index}.fieldData.type`} value={fieldData.type} />
    </p>
    <p>
      {'name: '}
      <Field name={`fields.${index}.fieldData.label`} value={fieldData.label} />
    </p>
    <p>
      {'placeholder: '}
      <Field
        name={`fields.${index}.fieldData.placeholder`}
        value={fieldData.placeholder}
      />
    </p>
    <p>
      {'required: '}
      <Field
        name={`fields.${index}.fieldData.required`}
        value={fieldData.required}
      />
    </p>
  </div>
);

export default Input;
