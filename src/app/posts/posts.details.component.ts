import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts.details.component.html'
})
export class PostsDetailsComponent implements OnInit {
  // instantiate posts to an empty object
  currentpost: currentpost;
  id: String;
  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) {
  }
  updatePots(post) {
    this.postsService.UpdatePost(this.id, post).subscribe(responsepost => {
      this.currentpost = responsepost[0];
      this.router.navigate(['posts']);
    });
  }
  ngOnInit() {
    // Subscribe to route params
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.postsService.getPostsById(this.id).subscribe(responsepost => {
        this.currentpost = responsepost[0];
      });
    });
  }
}
interface currentpost {
  userId: string;
  title: string;
  comment: string;
}