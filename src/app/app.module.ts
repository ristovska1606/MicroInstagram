import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PhotoDetailsComponent } from './photo/photo-details/photo-details.component';
import { PhotoListComponent } from './photo/photo-list/photo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoAddComponent } from './photo/photo-add/photo-add.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PhotoDetailsComponent,
    PhotoListComponent,
    PhotoAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
