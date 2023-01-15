import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

export type PopupType = 'success' | 'primary' | 'danger';

export interface Popup {
  type: PopupType;
  text: string;
  title?: string;
  confirmButtonText?: string;
}

@Injectable()
export class PopupService {
  popup$ = new Subject<Popup>();
  isConfirm$ = new Subject<boolean>();

  open(popup: Popup): Observable<boolean> {
    this.popup$.next(popup);

    return this.isConfirm$;
  }
}
