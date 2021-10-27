import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {HeaderComponent} from './header/header.component';
import {DashboardMobileComponent} from './dashboard-mobile/dashboard-mobile.component';
import {DashboardDesktopComponent} from './dashboard-desktop/dashboard-desktop.component';
import {FooterComponent} from "./footer/footer.component";
import {DashboardPanelComponent} from './dashboard-panel/dashboard-panel.component';
import {ItemsComponent} from "../barbecue/list/items/items.component";
import {AttendeesComponent} from "../barbecue/list/attendees/attendees.component";

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
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzListModule} from "ng-zorro-antd/list";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {BarbecueAddComponent} from "../barbecue/add/barbecue-add.component";
import {BarbecueEditComponent} from "../barbecue/edit/barbecue-edit.component";
import {BarbecueDetailsComponent} from "../barbecue/details/barbecue-details.component";
import {BarbecueCardComponent} from "../barbecue/card/barbecue-card.component";

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
    DashboardPanelComponent,
    BarbecueAddComponent,
    BarbecueEditComponent,
    BarbecueDetailsComponent,
    BarbecueCardComponent,
    ItemsComponent,
    AttendeesComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
