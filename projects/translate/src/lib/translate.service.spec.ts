import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { DEFAULT_LANG, TRANSLATIONS } from './common';
import { TranslateService } from './translate.service';

const en = {
  page1: {
    test: 'This is test',
    test2: 'This is test with {{ interpolation }}',
  },
};

const pl = {
  page1: {
    test: 'To jest test',
    test2: 'To jest test z {{ interpolation }}',
  },
};

describe('TranslateService', () => {
  let service: TranslateService;
  const subscribtion = new Subscription();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        { provide: TRANSLATIONS, useValue: { en, pl } },
        { provide: DEFAULT_LANG, useValue: 'en' },
      ],
    });

    service = TestBed.inject(TranslateService);
  });

  afterAll(() => {
    subscribtion.unsubscribe();
  });

  it('should tranlate text', (done) => {
    const result$ = service.get('page1.test');
    const sub = result$.subscribe((v) => {
      expect(v).toBe('This is test');
      done();
    });

    subscribtion.add(sub);
  });

  it('should translate text with interpolation.', () => {
    const result$ = service.get('page1.test2', {
      interpolation: 'interpolation',
    });
    const sub = result$.subscribe((v) => {
      expect(v).toBe('This is test with interpolation');
    });

    subscribtion.add(sub);
  });

  it('should return correct translations after language has been changed.', () => {
    service.changeLang('pl');

    const result$ = service.get('page1.test2', {
      interpolation: 'interpolacją',
    });
    const sub = result$.subscribe((v) => {
      expect(v).toBe('To jest test z interpolacją');
    });

    subscribtion.add(sub);
  });
});
