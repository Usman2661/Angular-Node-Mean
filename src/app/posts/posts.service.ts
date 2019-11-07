import {Post} from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Subject} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private PostsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postData) => {
      this.posts = postData.posts;

      this.PostsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.PostsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null , title: title, content: content};
    this.posts.push(post);
    this.PostsUpdated.next([...this.posts]);
  }
}