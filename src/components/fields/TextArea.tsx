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
        <Field name={`fields.${index}.fieldData.name`} value={fieldData.name} />
      </p>
      <p>
        {'rows: '}
        <Field
          name={`fields.${index}.fieldData.rows`}
          type="number"
          value={fieldData.rows}
        />
      </p>
      <p>
        {'cols: '}
        <Field
          name={`fields.${index}.fieldData.cols`}
          type="number"
          value={fieldData.cols}
        />
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
};

export default TextArea;
