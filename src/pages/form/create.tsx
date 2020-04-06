import React, { useState, useCallback } from 'react';
import * as Formik from 'formik';
import {
  FieldTemplate,
  InputFieldTemplate,
  TextAreaFieldTemplate,
  SelectFieldTemplate,
  FieldType,
  FieldData,
  Field,
  Form
} from './create.d';
import { Input, TextArea, Select } from '../../components/fields';

const getFieldData = (type: FieldType): FieldTemplate => {
  const input: InputFieldTemplate = {
    type: 'text',
    name: '',
    placeholder: '',
    required: false
  };
  const textarea: TextAreaFieldTemplate = {
    name: '',
    rows: 3,
    cols: 30,
    placeholder: '',
    required: false
  };
  const select: SelectFieldTemplate = {
    name: '',
    required: false,
    choiceList: []
  };
  const fieldData: FieldData = {
    input,
    textarea,
    select
  };
  return fieldData[type] || input;
};

/* eslint-disable react/no-array-index-key */
const renderAllFields = (fields: Field[]): JSX.Element[] => {
  // console.log(fields);
  return fields.map(
    (field, index): JSX.Element => {
      switch (field.fieldType) {
        case FieldType.INPUT:
          return (
            <Input
              key={index}
              index={index}
              fieldData={field.fieldData as InputFieldTemplate}
            />
          );

        case FieldType.TEXTAREA:
          return (
            <TextArea
              key={index}
              index={index}
              fieldData={field.fieldData as TextAreaFieldTemplate}
            />
          );

        case FieldType.SELECT:
          return (
            <Select
              key={index}
              index={index}
              fieldData={field.fieldData as SelectFieldTemplate}
            />
          );

        default:
          return <div />;
      }
    }
  );
};
/* eslint-enable */

const requestToCreateForm = (requestFormBody: Form) => {
  // console.log('!!!requestToCreateForm !!!');
  // console.log(requestFormBody);
  // console.log(process.env.REACT_APP_BACKEND_API);
  return requestFormBody;
};

const CreateFormPage = (): JSX.Element => {
  const [selectedTag, setSelectedTag] = useState<FieldType>(FieldType.INPUT);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedTag(event.target.value as FieldType);
  };

  const addTagToList = useCallback((): Field => {
    const field: Field = {
      fieldType: selectedTag,
      fieldData: getFieldData(selectedTag)
    };
    return field;
  }, [selectedTag]);

  return (
    <div>
      <Formik.Formik
        initialValues={{
          name: '',
          description: '',
          fields: [] as Field[]
        }}
        onSubmit={(values): void => {
          // console.log(values);
          requestToCreateForm(values);
        }}
      >
        {({ values }): JSX.Element => (
          <Formik.Form>
            <Formik.FieldArray
              name="fields"
              render={(fieldsHelper): JSX.Element => (
                <div>
                  อยากสร้างอะไรละ ?
                  <select onBlur={handleSelectChange}>
                    <option value="input">input</option>
                    <option value="textarea">textarea</option>
                    <option value="select">select</option>
                  </select>
                  <button
                    type="button"
                    onClick={(): void => fieldsHelper.push(addTagToList())}
                  >
                    เพิ่ม
                  </button>
                  <hr />
                  <p>
                    {'ฟอร์มชื่อ? '}
                    <Formik.Field name="name" />
                  </p>
                  <p>
                    {'รายละเอียดของฟอร์มคร่าวๆ '}
                    <Formik.Field name="description" />
                  </p>
                  {renderAllFields(values.fields)}
                  <button type="submit">ยืนยันการสร้าง</button>
                </div>
              )}
            />
          </Formik.Form>
        )}
      </Formik.Formik>
    </div>
  );
};

export default CreateFormPage;
