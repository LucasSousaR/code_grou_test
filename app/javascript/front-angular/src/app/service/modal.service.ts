import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openModalSource = new Subject<any>();
  openModal$ = this.openModalSource.asObservable();

  constructor() { }

  openModal(data: any) {
    this.openModalSource.next(data);
  }
}
