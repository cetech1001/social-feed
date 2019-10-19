import { Injectable } from '@angular/core';
import {Post} from '../interfaces/common';
import {BehaviorSubject, Observable} from 'rxjs';
import {WebService} from './web.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(public http: HttpClient, public webService: WebService) {
    this.postsSubject = new BehaviorSubject<Post[]>(this.postsStore);
    this.posts = this.postsSubject.asObservable();
  }

  private postsStore: Post[] = [];
  private postsSubject: BehaviorSubject<Post[]>;
  public posts: Observable<Post[]>;

  public getPosts(): void {
    this.http.get(`${WebService.baseUrl}/posts`)
      .subscribe(
        (posts: Post[]) => {
          this.postsStore = posts;
          this.postsSubject.next(this.postsStore);
        },
        error => {
          this.webService.log('Failed to get posts!', error);
        }
      );
  }

  public createPost(post: Post): void {
    this.http.post(`${WebService.baseUrl}/create/post`, post)
      .subscribe(
        (response: {message: string, post: Post}) => {
          this.getPosts();
          this.webService.log(response.message);
        },
        error => {
          this.webService.log('Failed to create post!', error);
        }
      );
  }

  public likePost(post: Post, user: string): void {
    this.http.get(`${WebService.baseUrl}/like/post/${post.id}/${user}`)
      .subscribe(
        () => {
          this.getPosts();
        },
        error => {
          this.webService.log('Failed to like post!', error);
        }
      );
  }
}
