import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule } from 'projects/translate/src/public-api';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot('en', {
          en: {
            mypage: {
              title: 'Hello {{ title }}',
            },
          },
          pl: {
            mypage: {
              title: 'Hello PL {{ title }}',
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render correct translations', () => {
    const elements = fixture.debugElement.queryAll(By.css('p'));

    expectParagraphsToMatch(elements, [
      'Service: Hello My Title',
      'Pipe: Hello My Title',
      'Current lang: en',
    ]);
  });

  it('should switch language in template after clicking the checkbox', () => {
    const elements = fixture.debugElement.queryAll(By.css('p'));
    const input = fixture.debugElement.query(By.css('input[type="checkbox"]'));

    input.nativeElement.click();

    fixture.detectChanges();

    expectParagraphsToMatch(elements, [
      'Service: Hello PL My Title',
      'Pipe: Hello PL My Title',
      'Current lang: pl',
    ]);
  });
});

function expectParagraphsToMatch(elements: DebugElement[], expected: string[]) {
  elements.forEach((e, i) => {
    expect(e.nativeElement.innerHTML).toBe(expected[i]);
  });
}
