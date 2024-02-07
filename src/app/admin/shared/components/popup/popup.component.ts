import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService, PopupType } from '../../services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit, OnDestroy {
  type: PopupType = 'success';
  text = '';
  confirmButtonText = 'OK';
  title?: string;
  popupSubscription!: Subscription;

  constructor(private popupService: PopupService) {}

  ngOnInit(): void {
    this.popupSubscription = this.popupService.popup$.subscribe({
      next: (popup) => {
        this.type = popup.type;
        this.text = popup.text;

        if (popup.confirmButtonText) {
          this.confirmButtonText = popup.confirmButtonText;
        }

        if (popup.title) {
          this.title = popup.title;
        }
      },
    });
  }

  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }

  onConfirm(): void {
    this.popupService.isConfirm$.next(true);
    this.hide();
  }

  onCancel(): void {
    this.popupService.isConfirm$.next(false);
    this.hide();
  }

  hide(): void {
    this.text = '';
  }
}
