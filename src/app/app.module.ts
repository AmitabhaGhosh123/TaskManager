import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TaskService } from './task.service';
import { CreatenewtaskComponent } from './createnewtask/createnewtask.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsviewComponent } from './detailsview/detailsview.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CreatenewtaskComponent,
    DetailsviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
