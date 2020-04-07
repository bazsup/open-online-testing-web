import React from 'react';
import { FieldArray, Field } from 'formik';
import { SelectFieldTemplate, Choice } from '../../pages/form/create.d';
// ที่ส่งตัวแปรจากข้างนอกเข้ามา
interface SelectProps {
  index: number;
  fieldData: SelectFieldTemplate;
  choiceList: Choice[];
}

const Select: React.FC<SelectProps> = ({
  index,
  fieldData,
  choiceList
}: SelectProps) => {
  return (
    <div style={{ margin: '10px 0', border: '1px solid #333' }}>
      <p>tag: select</p>
      <p>
        {'name: '}
        <Field
          name={`fields.${index}.fieldData.label`}
          value={fieldData.label}
        />
      </p>
      <p>
        {'required: '}
        <Field
          name={`fields.${index}.fieldData.required`}
          value={fieldData.required}
        />
      </p>
      {choiceList.map((choice, choiceIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`${choiceIndex}`} style={{ border: '1px solid pink' }}>
          <p>{`ตัวเลือกที่ ${choiceIndex}`}</p>
          <p>
            {'label: '}
            <Field
              name={`fields.${index}.choiceList.${choiceIndex}.label`}
              value={choice.label}
            />
          </p>
          <p>
            {'value: '}
            <Field
              name={`fields.${index}.choiceList.${choiceIndex}.value`}
              value={choice.value}
            />
          </p>
        </div>
      ))}
      <FieldArray name={`fields.${index}.choiceList`}>
        {(arrayHelper): JSX.Element => (
          <button
            type="button"
            onClick={(): void => {
              arrayHelper.push({ value: '', label: '' });
            }}
          >
            เพิ่ม option
          </button>
        )}
      </FieldArray>
    </div>
  );
};

export default Select;
