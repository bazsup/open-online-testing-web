export interface FieldTemplate {
  label: string;
  required: boolean;
}

export interface InputFieldTemplate extends FieldTemplate {
  type: string;
  placeholder: string;
}

export interface TextAreaFieldTemplate extends FieldTemplate {
  placeholder: string;
}

export interface Attribute {
  name: string;
  value: string;
}

export interface Choice {
  label: string;
  value: string;
}

export interface SelectFieldTemplate extends FieldTemplate {
  choiceList: Choice[];
}

// type FieldType = 'input' | 'textarea' | 'select';
export enum FieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select'
}

export type FieldData = {
  [key in FieldType]?: FieldTemplate;
};

export type Form = {
  name: string;
  description: string;
  fields: Field[];
};

export interface Field {
  fieldType: FieldType;
  fieldData: FieldTemplate;
  attributes: Attribute[];
}
