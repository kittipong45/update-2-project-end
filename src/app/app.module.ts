import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { ActivityClubComponent } from './activity-club/activity-club.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CardJoinActivityComponent } from './Component/card-join-activity/card-join-activity.component';
import { NewActivityComponent } from './popup/new-activity/new-activity.component';
import { JoinActivityComponent } from './join-activity/join-activity.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { ViewDataActivytyComponent } from './view-data-activyty/view-data-activyty.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    ForgotPasswordComponent,
    RegisterUserComponent,
    HomeComponent,
    ActivityClubComponent,
    CalendarComponent,
    CardJoinActivityComponent,
    NewActivityComponent,
    JoinActivityComponent,
    ProfileComponent,
    NavbarComponent,
    ViewDataActivytyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    RouterModule,

  ],
  providers: [CookieService],

  bootstrap: [AppComponent]
})
export class AppModule { }
