import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { FieldType } from '../shared/types';
import { FormUtil } from '../shared/form-util';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent extends FormUtil implements OnInit, OnDestroy {
  form!: FormGroup;
  post!: Post;
  submitted = false;
  updateSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.postsService.getById(params['id']))
      )
      .subscribe({
        next: (post: Post) => {
          this.post = post;
          this.form = new FormGroup({
            title: new FormControl(post.title, Validators.required),
            text: new FormControl(post.text, Validators.required),
          });
        },
      });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    this.updateSubscription = this.postsService
      .update({
        ...this.post,
        text: this.form.value.text,
        title: this.form.value.title,
      })
      .subscribe({
        next: () => {
          this.submitted = false;
          this.alert.success('Post was updated');
        },
        error: () => {
          this.submitted = false;
        },
      });
  }

  get titleField(): FieldType {
    return this.form.get('title');
  }

  get textField(): FieldType {
    return this.form.get('text');
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
