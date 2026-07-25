export interface AppSelectOption<T extends string | number = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
