import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NZ_I18N, pt_BR} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {BrowserModule} from "@angular/platform-browser";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzGridModule} from "ng-zorro-antd/grid";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { ItemDetailsComponent } from './components/item/item-details/item-details.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    ItemDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [{provide: NZ_I18N, useValue: pt_BR}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
