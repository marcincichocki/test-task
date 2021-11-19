import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from 'projects/translate/src/public-api';
import en from '../assets/translations/en.json';
import pl from '../assets/translations/pl.json';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot('en', { en, pl }),
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
