import {Component, Inject, Input, OnInit} from '@angular/core';

import {Task} from "../task.model";
import {TaskService} from '../service/task.service'

import {NgIf} from "@angular/common";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-edit-title-modal',
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
  templateUrl: './edit-title-modal.component.html',
  styleUrl: './edit-title-modal.component.scss'
})
export class EditTitleModalComponent  implements OnInit {

  constructor( public dialogRef: MatDialogRef<EditTitleModalComponent>,
               @Inject(MAT_DIALOG_DATA) public task: Task,
               private taskService: TaskService) { }

  ngOnInit(): void {}
  salvarAlteracoes() {

    this.taskService.updateTask(this.task).subscribe(
      () => {
        console.log('Tarefa atualizada com sucesso');
        this.dialogRef.close();
      },
      error => {
        console.error('Erro ao atualizar tarefa:', error);

      }
    );
  }
  fecharModal(): void {
    this.dialogRef.close();
  }
}
