import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../helpers/services/posts.service';
import {AuthService} from '../../helpers/services/auth.service';
import {Post, User} from '../../helpers/interfaces/common';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  constructor(public postsService: PostsService, public authService: AuthService) { }

  public newPost: string;
  public user: User;
  public posts: Post[];

  ngOnInit() {
    this.postsService.getPosts();
    this.authService.currentUser
      .subscribe((user: User) => {
        this.user = user;
      });
    this.postsService.posts
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.posts.sort((a: Post, b: Post): number => {
          return a.id < b.id ? 1 : -1;
        });
      });
  }

  public get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  public createPost(): void {
    this.authService.currentUser
      .subscribe((user: User) => {
        this.postsService.createPost({
          user: user.username,
          body: this.newPost,
          likes: 0
        });
      });
    this.newPost = '';
  }

  public likePost(post: Post): void {
    this.authService.currentUser
      .subscribe((user: User) => {
        this.postsService.likePost(post, user.username);
      });
  }

}
