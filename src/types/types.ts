// Почему
export type sum = (a: number, b: number) => number

// TODO поинтересоваться насчёт exportа выше 
// обьект валидации
export type CreateFormValidator = (form: HTMLFormElement) => FormValidator;

// основа для библиотеки
export interface FormValidator {
  field: (fieldName: string) => FieldValidator;
  validate: () => boolean;
  errors: Record<string, string>;
  setError: (fieldName: string, message: string) => void;
  clearErrors: () => void;
}

// какие впринципе данные будут валидироваться в поле
// TODO уточнить только строки, числа и массивы?
export interface FieldValidator {
  string: () => StringFieldValidator;
  number: () => NumberFieldValidator;
  array: () => ArrayFieldValidator;
}

// Строки

export interface StringFieldValidator {
  min: (len: number, message?: string) => StringFieldValidator;
  max: (len: number, message?: string) => StringFieldValidator;
  email: (message?: string) => StringFieldValidator;
  required: (message?: string) => StringFieldValidator;
  pattern: (regex: RegExp, message?: string) => StringFieldValidator;
}

// Числа

export interface NumberFieldValidator {
  min: (val: number, message?: string) => NumberFieldValidator;
  max: (val: number, message?: string) => NumberFieldValidator;
  integer: (message?: string) => NumberFieldValidator;
  required: (message?: string) => NumberFieldValidator;
}

// Массивы

export interface ArrayFieldValidator {
  min: (len: number, message?: string) => ArrayFieldValidator;
  max: (len: number, message?: string) => ArrayFieldValidator;
  required: (message?: string) => ArrayFieldValidator;
}

