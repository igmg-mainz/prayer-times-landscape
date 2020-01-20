import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PrayerComponent } from './prayer/prayer.component';
import { FormsModule } from '@angular/forms';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';
import { HeaderComponent } from './header/header.component';
import { SurahComponent } from './surah/surah.component';
import { AsmaComponent } from './asma/asma.component';
import { ClockComponent } from './clock/clock.component';
import { DateComponent } from './date/date.component';
import { WeatherComponent } from './weather/weather.component';
import { MatDialogModule } from '@angular/material';
import { AnnouncementDialogComponent } from './announcement-dialog/announcement-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnnouncementComponent } from './announcement/announcement.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PrayerComponent,
    PrayerTimesComponent,
    HeaderComponent,
    SurahComponent,
    AsmaComponent,
    ClockComponent,
    DateComponent,
    WeatherComponent,
    AnnouncementDialogComponent,
    AnnouncementComponent
  ],
  entryComponents: [
    AnnouncementDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NoopAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
