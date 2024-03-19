// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Remove the duplicate import
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateShortLinkComponent } from './create-short-link/create-short-link.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterComponent } from './register/register.component';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { ShorturlredirectComponent } from './shorturlredirect/shorturlredirect.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateShortLinkComponent,
    RegisterComponent,
    AnalyticsComponent,
    ShorturlredirectComponent,

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatSnackBarModule,
    AgChartsAngularModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
