export type CheckboxValueType = string | number | boolean;

export interface CheckboxDataProps {
  key: string;
  label: string;
  value: string;
}

export interface TreeDataProps {
  title: string;
  key: string;
  children?: Array<TreeDataProps>;
}
