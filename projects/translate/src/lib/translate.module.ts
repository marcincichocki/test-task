import { ModuleWithProviders, NgModule } from '@angular/core';
import { DEFAULT_LANG, TRANSLATIONS, Translations } from './common';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
})
export class TranslateModule {
  static forRoot(
    defaultLang: string,
    translations: Record<string, Translations>
  ): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: [
        TranslateService,
        {
          provide: TRANSLATIONS,
          useValue: translations,
        },
        {
          provide: DEFAULT_LANG,
          useValue: defaultLang,
        },
      ],
    };
  }
}
