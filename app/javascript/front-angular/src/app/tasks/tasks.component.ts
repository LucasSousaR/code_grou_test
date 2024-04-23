import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Task} from "../task.model";
import {NgForOf, UpperCasePipe,NgIf} from "@angular/common";

import {TaskService} from '../service/task.service'
import {TaskModalComponent} from "../task-modal/task-modal.component";
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableModule,MatTableDataSource } from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import { MatIconModule } from '@angular/material/icon';
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {
  MatList,
  MatListItem,
  MatListItemLine,
  MatListItemTitle,
  MatListOption,
  MatSelectionList
} from "@angular/material/list";
import {MatCardModule} from '@angular/material/card';
import { ModalService } from '../service/modal.service';
import { MatDialog } from '@angular/material/dialog';
import {EditTitleModalComponent} from "../edit-title-modal/edit-title-modal.component";
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    UpperCasePipe,
    NgForOf,
    NgIf,
    TaskModalComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatTableModule,
    MatPaginatorModule,
    MatSort,
    MatIconModule,
    MatSortHeader,
    MatIconButton,
    MatTooltip,
    MatList,
    MatListItem,
    MatCardModule,
    MatSelectionList,
    MatListOption,
    MatListItemTitle,
    MatListItemLine
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent  implements  OnInit{

  dataSource: Task[] = []
  selectedTask?: Task;
  constructor(private taskService: TaskService,public dialog: MatDialog) {}

  hoveredRowIndex: number | null = null; // Índice da linha que está sendo passada com o mouse

  setHoveredRowIndex(index: number | null) {
    this.hoveredRowIndex = index;
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
      this.dataSource = tasks;

    }, (err) => {
      console.error("Erro: " + err);
    }, () => {
      console.log("get tasks -> sucess");
    });

  }
  editarTask(task: any) {
    const dialogRef = this.dialog.open(EditTitleModalComponent, {
      width: '338px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado');
    });
    // Lógica para editar a task...
  }

  excluirTask(task: Task): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(task.id).subscribe(
        () => {
          console.log('Tarefa excluída com sucesso');

          this.getTasks();
        },
        error => {
          console.error('Erro ao excluir tarefa:', error);

        }
      );
    }
  }

  onSelect(task: Task){
    this.selectedTask = task
  }
}
