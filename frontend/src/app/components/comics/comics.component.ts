import { Component, OnInit } from '@angular/core';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  showMessage;
  message;
  newPost = false;
  loadingComics = false;

  constructor() { }

  newComicForm(){
    this.newPost = true;
  }

  // LOCK AND DISABLE RELOAD BUTTON SO THAT USER CANT CLICK ON IT MORE THAN ONCE EVERY 2s
  reloadComics(){
    this.loadingComics = true;

    setTimeout(() => {
      this.loadingComics = false;
    }, 2000);
  }

  writeComment(){

  }

  ngOnInit() {
  }

}
