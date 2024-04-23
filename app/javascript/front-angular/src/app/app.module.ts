import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskModalComponent } from "./task-modal/task-modal.component";
import { AppRoutes } from "./app.routes";

// Angular Material
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';

import {MatFormFieldModule} from '@angular/material/form-field';

import { FlexLayoutModule } from "@angular/flex-layout";
import {MatCardModule} from '@angular/material/card';
import {EditTitleModalComponent} from "./edit-title-modal/edit-title-modal.component";
import {HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskModalComponent,
    EditTitleModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
