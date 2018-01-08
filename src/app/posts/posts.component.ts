import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
  // instantiate posts to an empty object
  posts: any = [];
  constructor(private postsService: PostsService, private router: Router) { }
  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  redirectCreatePost(){
    this.router.navigate(['add']);
  }
}
