import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogEditItemComponent} from './dialog-edit-item/dialog-edit-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {ServiceService} from './servicios/service.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogEditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    RippleModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    ToastModule,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ServiceService, multi: true},
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
