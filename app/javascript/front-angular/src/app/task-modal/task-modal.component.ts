import {Component,Input} from '@angular/core';

import {Task} from "../task.model";
import {NgIf} from "@angular/common";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {TaskService} from "../service/task.service";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    NgIf,
    MatFormField,
    MatDialogTitle,
    MatDialogContent,
    MatInput,
    MatDialogActions,
    MatButton,
    MatFormFieldModule,
    FormsModule

  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {
  newTask: Task = { id: 0, title: '', created_at: '', updated_at: '' };
  constructor(public dialogRef: MatDialogRef<TaskModalComponent>,
              private taskService: TaskService
  ) {}

  criarTask():void{
    this.taskService.addTask(this.newTask).subscribe(
      () => {
        console.log('Nova tarefa criada com sucesso');

        this.fecharModal();
        location.reload()
      },
      error => {
        console.error('Erro ao criar nova tarefa:', error);

      }
    );
  }
  fecharModal(): void {
    this.dialogRef.close();
  }


}
