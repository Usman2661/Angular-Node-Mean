import {Post} from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import {Subject} from 'rxjs';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const BACK_URL = environment.apiURL + '/posts/';


@Injectable({ providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private PostsUpdated = new Subject<{ posts: Post[], postCount: number}>();

  constructor(private http: HttpClient , private router: Router) {}

  getPosts(postsPerPage: number , currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, posts: any , maxPosts: number}>(BACK_URL + queryParams
    )
    .pipe(map((postData) => {
      return { posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            creator: post.creator
          };
      }), maxPosts: postData.maxPosts
    };

    }))
    .subscribe((tansformedPostData) => {

      console.log(tansformedPostData);
      this.posts = tansformedPostData.posts;
      this.PostsUpdated.next({posts: [...this.posts], postCount: tansformedPostData.maxPosts});
    });
  }

  getPostUpdateListener() {
    return this.PostsUpdated.asObservable();
  }

  addPost(title: string, content: string , image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);

    postData.append('image', image , title);


    this.http.post<{message: string , post: Post }>(BACK_URL, postData)
    .subscribe((responseData) => {

      this.router.navigate(['/']);

    });

  }

  deletePost(id: string) {
    return this.http.delete(BACK_URL + id);
  }
  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string , imagePath: string , creator: string}>('http://localhost:3000/api/posts/' + id);
  }

  updatePost(id: string, title: string , content: string , image: File | string ) {
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
       postData = new FormData();
       postData.append('id', id);
       postData.append('title', title);
       postData.append('content', content);
       postData.append('image', image , title);

    } else {
       postData = {
        id,
        title,
        content,
        imagePath: image,
        creator: null
      };

    }
    const post: Post = { id , title, content , imagePath: null , creator: null};

    this.http.put(BACK_URL + id, postData)
    .subscribe((response) => {

      this.router.navigate(['/']);

    });

  }
}
