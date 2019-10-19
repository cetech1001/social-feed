import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../../helpers/services/posts.service';
import {Post, User} from '../../helpers/interfaces/common';
import {AuthService} from '../../helpers/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public postsService: PostsService, public authService: AuthService) {
    this.activatedRoute.url
      .subscribe(url => {
        this.keyPhrase = url.pop().path;
        this.postsService.posts
          .subscribe((posts: Post[]) => {
            this.posts = [];
            posts.forEach(post => {
              if (post.user.toLowerCase().includes(this.keyPhrase.toLowerCase())) {
                this.posts.push(post);
              } else {
                if (post.body.toLowerCase().includes(this.keyPhrase.toLowerCase())) {
                  this.posts.push(post);
                }
              }
            });
          });
      });
  }

  public posts: Post[] = [];
  public keyPhrase: string;

  ngOnInit() {
    this.postsService.getPosts();
  }

  public likePost(post: Post): void {
    this.authService.currentUser
      .subscribe((user: User) => {
        this.postsService.likePost(post, user.username);
      });
  }

}
