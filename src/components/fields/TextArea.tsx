import React from 'react';
import { Field } from 'formik';
import { TextAreaFieldTemplate } from '../../pages/form/create.d';

interface TextAreaProps {
  index: number;
  fieldData: TextAreaFieldTemplate;
}

const TextArea: React.FC<TextAreaProps> = ({
  index,
  fieldData
}: TextAreaProps): JSX.Element => {
  return (
    <div style={{ margin: '10px 0', border: '1px solid #333' }}>
      <p>tag: textarea</p>
      <p>
        {'name: '}
        <Field name={`fields.${index}.fieldData.label`} />
      </p>
      <p>
        {'rows: '}
        <Field name={`fields.${index}.attributes.0.name`} type="number" />
      </p>
      <p>
        {'cols: '}
        <Field name={`fields.${index}.attributes.1.name`} type="number" />
      </p>
      <p>
        {'placeholder: '}
        <Field name={`fields.${index}.placeholder`} />
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
};

export default TextArea;
