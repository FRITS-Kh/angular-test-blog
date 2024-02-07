import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { of, Subscription, switchMap, take } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { PopupService, Popup } from '../shared/services/popup.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSubscription!: Subscription;
  removeSubscription!: Subscription;
  searchRequest = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.postsSubscription = this.postsService.getAll().subscribe((posts) => {
      this.posts = [...posts];
    });
  }

  remove(id: string, title?: string): void {
    const popupConfig: Popup = {
      type: 'danger',
      text: `Do you want to remove the ${title ? `"${title}"` : ''} post?`,
      confirmButtonText: 'Remove',
    };
    const isConfirmed = false;

    this.removeSubscription = this.popupService
      .open(popupConfig)
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.postsService.remove(id) : of(isConfirmed)
        )
      )
      .subscribe({
        next: (result) => {
          if (result === isConfirmed) {
            return;
          }

          this.posts = this.posts.filter((post) => post.id !== id);
          this.alert.warning('Post was removed');
        },
      });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }

    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }
  }
}
