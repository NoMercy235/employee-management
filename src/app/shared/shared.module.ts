import { NgModule } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
  ],
  exports: [
    BrowserModule,
    CommonModule,

    ConfirmComponent,
  ],
  declarations: [
    ConfirmComponent,
  ],
  entryComponents: [
    ConfirmComponent,
  ],
  providers: [],
})
export class SharedModule {
}
