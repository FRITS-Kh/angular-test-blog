import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSubscription!: Subscription;
  removeSubscription!: Subscription;
  searchRequest = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.postsSubscription = this.postsService.getAll().subscribe((posts) => {
      this.posts = [...posts];
    });
  }

  remove(id: string): void {
    this.removeSubscription = this.postsService.remove(id).subscribe({
      next: () => {
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
