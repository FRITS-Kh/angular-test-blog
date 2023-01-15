import { FieldType } from './types';

export class FormUtil {
  constructor() {}

  isFieldInvalid(field: FieldType): boolean {
    return Boolean(field?.touched && field?.invalid);
  }

  getFieldErrorValue(field: FieldType, key: string): any {
    return field?.errors?.[key];
  }
}
