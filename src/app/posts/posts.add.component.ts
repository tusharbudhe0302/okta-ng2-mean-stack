import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-add',
  templateUrl: './post.add.component.html'
})

export class PostsAddComponent implements OnInit {
  // instantiate posts to an empty object
  addPostItem: any;
  validationMessege: Array<string> = [];
  constructor(private postsService: PostsService, private router: Router) {
    this.addPostItem = {
      userId: '',
      title: '',
      comment: ''
    }
  }
  createPost(addPostItem) {
    this.validationMessege.length = 0;
    for (const property in addPostItem) {
      if (addPostItem[property].toString().length <= 0) {
        this.validationMessege.push(property.toString() + ' should not be null or empty!');
      }
    }
    if (this.validationMessege.length <= 0) {
      this.postsService.createPost(addPostItem).subscribe(responsepost => {
        this.router.navigate(['posts']);
      });
    }
  }
  ngOnInit() {
  }
}
