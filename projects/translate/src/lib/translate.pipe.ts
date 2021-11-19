import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(key: string, params: Record<string, string>) {
    return this.translateService.instant(key, params);
  }
}
