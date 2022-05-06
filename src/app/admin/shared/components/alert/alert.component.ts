import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService, AlertType } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;

  text = '';
  type: AlertType = 'success';
  alertSubscription!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService.alert$.subscribe({
      next: (alert) => {
        this.text = alert.text;
        this.type = alert.type;

        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.text = '';
        }, this.delay);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }
}
