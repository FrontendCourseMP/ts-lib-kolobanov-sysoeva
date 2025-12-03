export abstract class BaseFieldValidator {
  protected rules: Rule[] = [];
  protected readonly form: HTMLFormElement;
  protected readonly fieldName: string;

  constructor(form: HTMLFormElement, fieldName: string) {
    this.form = form;
    this.fieldName = fieldName;
  }

  protected addRule(check: (value: unknown) => boolean, message?: string): this {
    this.rules.push({ check, message });
    return this;
  }

  public abstract validate(): string | null;
}