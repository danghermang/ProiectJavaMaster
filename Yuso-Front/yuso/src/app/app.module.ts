import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendApiService } from './services/backend-api.service';
import { HttpModule } from '@angular/http';
import { PhotoviewerComponent } from './photoviewer/photoviewer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './dashboard/about/about.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { SidebarBtnComponent } from './dashboard/sidebar/sidebar-btn/sidebar-btn.component';
import { TopbarComponent } from './dashboard/topbar/topbar.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { CreateauctionComponent } from './dashboard/createauction/createauction.component';
import { MapService } from './services/map.service';
import { MyauctionsComponent } from './dashboard/myauctions/myauctions.component';
import { BookingsComponent } from './dashboard/bookings/bookings.component';
import { BookingsEntryComponent } from './dashboard/bookings/bookings-entry/bookings-entry.component';
import { StatusComponent } from './dashboard/status/status.component';
import { SearchComponent } from './dashboard/search/search.component';
import { AuctionComponent } from './dashboard/auction/auction.component';
import { MatCardModule } from '@angular/material/card'
import { MatStepperModule } from '@angular/material/stepper'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { ChatComponent } from './dashboard/chat/chat.component';
import { ConversationComponent } from './dashboard/chat/conversation/conversation.component'
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';
 
declare var require: any;
export function highChartsFactory() {
	return require('highcharts');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PhotoviewerComponent,
    PagenotfoundComponent,
    DashboardComponent,
    AboutComponent,
    HomeComponent,
    SidebarComponent,
    SidebarBtnComponent,
    TopbarComponent,
    ProfileComponent,
    ContactComponent,
    SettingsComponent,
    CreateauctionComponent,
    MyauctionsComponent,
    BookingsComponent,
    BookingsEntryComponent,
    StatusComponent,
    SearchComponent,
    AuctionComponent,
    StatisticsComponent,
    ChatComponent,
    ConversationComponent,
    AlertPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, HttpModule,
    routes,
    BrowserAnimationsModule,
    ChartModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CountdownTimerModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [BackendApiService, MapService, {provide:HighchartsStatic, useFactory : highChartsFactory}],
  bootstrap: [AppComponent],
  entryComponents: [AlertPopupComponent]
})
export class AppModule { }
