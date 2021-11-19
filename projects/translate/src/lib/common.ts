import { InjectionToken } from '@angular/core';

export interface Translations {
  [key: string]: Record<string, string>;
}

export const TRANSLATIONS = new InjectionToken<Translations>(
  'ngx-translations'
);

export const DEFAULT_LANG = new InjectionToken<string>('ngx-active-lang');

export class TranslateError extends Error {
  constructor(message: string) {
    super(`[ngx-translate] ${message}`);
  }
}
