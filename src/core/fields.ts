import { BaseFieldValidator } from './base';
import type { StringFieldValidator } from '../../types';


export class StringFieldValidatorR
  extends BaseFieldValidator
  implements StringFieldValidator
{
  public validate(): string | null {
      throw new Error('Method not implemented.');
  }
  /** Минимальная длина строки */
  min(len: number, message?: string): this {
    return this.addRule(
      (value: unknown) =>
        typeof value === 'string' && value.length >= len,
      message ?? `Минимальная длина — ${len}`
    );
  }

  /** Максимальная длина строки */
  max(len: number, message?: string): this {
    return this.addRule(
      (value: unknown) =>
        typeof value === 'string' && value.length <= len,
      message ?? `Максимальная длина — ${len}`
    );
  }

  /** Является ли значение строкой */
  string(message?: string): this {
    return this.addRule(
      (value: unknown) => typeof value === 'string',
      message ?? `Значение должно быть строкой`
    );
  }
}