// Точка входа в ваше решение

import type{
    StringFieldValidator,
    NumberFieldValidator,
    ArrayFieldValidator,
} from './types/types';

function getFormElements(form: HTMLFormElement, name: string): (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[] {
  return Array.from(form.querySelectorAll(`[name="${name}"]`));
}



// import * as s from types/types.ts

// validator.field(stroka).string().min('Мало символов!')
