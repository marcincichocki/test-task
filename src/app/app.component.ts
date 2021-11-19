import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from 'projects/translate/src/public-api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly key = 'mypage.title';
  readonly params = { title: 'My Title' };

  readonly result$ = this.translateService.get(this.key, this.params);

  readonly langCheckbox = new FormControl(false);

  private readonly destroy = new Subject<void>();

  constructor(public translateService: TranslateService) {}

  ngOnInit() {
    this.langCheckbox.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((v) => {
        if (v) {
          this.translateService.changeLang('pl');
        } else {
          this.translateService.changeLang('en');
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
