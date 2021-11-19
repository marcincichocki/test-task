import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import {
  DEFAULT_LANG,
  TranslateError,
  TRANSLATIONS,
  Translations,
} from './common';

@Injectable()
export class TranslateService {
  private dict = new BehaviorSubject(this.translations[this.defaultLang]);

  private lang: string = this.defaultLang;
  get currentLang() {
    return this.lang;
  }

  readonly languageChanged = new Subject<string>();

  constructor(
    @Inject(TRANSLATIONS)
    private readonly translations: Record<string, Translations>,
    @Inject(DEFAULT_LANG) private readonly defaultLang: string
  ) {}

  changeLang(lang: string) {
    if (lang in this.translations) {
      this.lang = lang;

      this.dict.next(this.translations[lang]);
      this.languageChanged.next(lang);
    } else {
      throw new TranslateError(`No translations for "${lang}" language.`);
    }
  }

  get(path: string, params?: Record<string, string>) {
    return this.dict.pipe(map((d) => this.interpolate(d, path, params)));
  }

  instant(path: string, params?: Record<string, string>) {
    return this.interpolate(this.dict.value, path, params);
  }

  private interpolate(
    dict: Translations,
    path: string,
    params: Record<string, string> = {}
  ) {
    const [page, key] = path.split('.');
    let message = dict[page][key];

    for (const key in params) {
      const value = params[key];
      const re = new RegExp(`{{\\s*${key}\\s*}}`, 'g');

      message = message.replace(re, value);
    }

    return message;
  }
}
