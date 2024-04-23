import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {MatToolbar} from "@angular/material/toolbar";
import {TaskModalComponent} from "./task-modal/task-modal.component";
import { MatDialog } from '@angular/material/dialog';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TasksComponent, MatToolbar, TaskModalComponent, MatCard, MatCardContent, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TASK LIST';
  constructor(public dialog: MatDialog) {}

  abrirModal(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '338px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado');
    });
  }


}
