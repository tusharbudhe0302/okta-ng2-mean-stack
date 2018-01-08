import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class PostsService {
  constructor(private http: Http) { }
  private _serverError(err: any) {
    // console.log('sever error:', err);  // debug
    // window.location.href = 'https://dev-868765-admin.oktapreview.com';
    return Observable.throw(err || 'backend server error');
  }
  //posts API
  getAllPosts() {
    return this.http.get('/api/posts')
      .map(res => res.json())
      .catch(this._serverError);
  }
  getPostsById(id) {
    return this.http.get('/api/posts/'+id)
      .map(res => res.json())
      .catch(this._serverError);
  }
  UpdatePost(id,currentPost) {
    return this.http.put('/api/posts/'+id,currentPost)
      .map(res => res.json())
      .catch(this._serverError);
  }
  createPost(currentPost) {
    return this.http.post('/api/posts/',currentPost)
      .map(res => res.json())
      .catch(this._serverError);
  }
}
