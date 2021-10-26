import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {HeaderComponent} from './header/header.component';
import {DashboardMobileComponent} from './dashboard-mobile/dashboard-mobile.component';
import {DashboardDesktopComponent} from './dashboard-desktop/dashboard-desktop.component';
import {FooterComponent} from "./footer/footer.component";

import {NzCardModule} from 'ng-zorro-antd/card';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzModalModule} from "ng-zorro-antd/modal";
import {ItemCardComponent} from "../item/card/item-card.component";
import {DashboardPanelComponent} from './dashboard-panel/dashboard-panel.component';
import {ItemAddComponent} from "../item/add/item-add.component";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {ItemEditComponent} from "../item/edit/item-edit.component";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {ItemDetailsComponent} from "../item/item-details/item-details.component";
import {NzListModule} from "ng-zorro-antd/list";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzTypographyModule} from "ng-zorro-antd/typography";


@NgModule({
  imports: [
    DashboardRoutingModule,
    NzCardModule,
    NzGridModule,
    NzDatePickerModule,
    CommonModule,
    NzButtonModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzEmptyModule,
    NzProgressModule,
    ReactiveFormsModule,
    NzSelectModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,
    NzModalModule,
    NzRadioModule,
    NzCollapseModule,
    NzInputModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzRadioModule,
    NzCollapseModule,
    NzListModule,
    NzSkeletonModule,
    NzTypographyModule,
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    DashboardMobileComponent,
    DashboardDesktopComponent,
    FooterComponent,
    ItemCardComponent,
    DashboardPanelComponent,
    ItemAddComponent,
    ItemEditComponent,
    ItemDetailsComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
