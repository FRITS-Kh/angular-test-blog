import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { FieldType } from '../shared/types';
import { FormUtil } from '../shared/form-util';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent extends FormUtil {
  form = new UntypedFormGroup({
    title: new UntypedFormControl(null, [Validators.required]),
    text: new UntypedFormControl(null, [Validators.required]),
    author: new UntypedFormControl(null, [Validators.required]),
  });

  constructor(private postsService: PostsService, private alert: AlertService) {
    super();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
    };

    this.postsService.create(post).subscribe({
      next: () => {
        this.form.reset();
        this.alert.success('Post was created');
      },
    });
  }

  get titleField(): FieldType {
    return this.form.get('title');
  }

  get textField(): FieldType {
    return this.form.get('text');
  }

  get authorField(): FieldType {
    return this.form.get('author');
  }
}
