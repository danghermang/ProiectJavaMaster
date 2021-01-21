import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from './dashboard/home/home.component';
import { AboutComponent } from './dashboard/about/about.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { CreateauctionComponent } from './dashboard/createauction/createauction.component';
import { MyauctionsComponent } from './dashboard/myauctions/myauctions.component';
import { BookingsComponent } from './dashboard/bookings/bookings.component';
import { StatusComponent } from './dashboard/status/status.component';
import { SearchComponent } from './dashboard/search/search.component';
import { AuctionComponent } from './dashboard/auction/auction.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { ChatComponent } from './dashboard/chat/chat.component';

export const router: Routes = [
	{
		path: "", component: DashboardComponent, children: [
			{ path: '', component: HomeComponent },
			{ path: 'about', component: AboutComponent },
			{ path: 'profile', component: ProfileComponent },
			{ path: 'contact', component: ContactComponent },
			{ path: 'createauction', component: CreateauctionComponent },
			{ path: 'settings', component: SettingsComponent },
			{ path: 'myauctions', component: MyauctionsComponent },
			{ path: 'bookings', component: BookingsComponent },
			{ path: 'status', component: StatusComponent },
			{ path: 'search', component: SearchComponent },
			{ path: 'auction', component: AuctionComponent },
			{ path: 'statistics', component: StatisticsComponent },
			{ path: 'chat', component: ChatComponent }
		]
	},
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{ path: '**', component: PagenotfoundComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
