import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule , MatButtonModule ,
  MatToolbarModule ,
  MatExpansionModule,
  MatProgressSpinnerModule} from '@angular/material';
import {HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
