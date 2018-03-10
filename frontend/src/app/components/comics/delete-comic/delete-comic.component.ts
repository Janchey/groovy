import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../../services/comics.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-comic',
  templateUrl: './delete-comic.component.html',
  styleUrls: ['./delete-comic.component.css']
})
export class DeleteComicComponent implements OnInit {

  showMessage;
  message;
  lockSubmit = false;
  comicIsFound = false;
  comic;
  currentUrl;

  constructor(
    private comicsService: ComicsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  deleteThisComic(){
    this.lockSubmit = true;
    this.comicsService.deleteComic(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
        this.showMessage = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.showMessage = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/comics']);
        },2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.comicsService.getSingleComic(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.showMessage = 'alert alert-danger';
        this.message = 'Comic not found';
      } else {
        this.comic = {
          title: data.comic.title,
          creator: data.comic.creator,
          writer: data.comic.writer,
          artist: data.comic.artist,
          publisher: data.comic.publisher,
          status: data.comic.status,
          number: data.comic.number,
          originalNumber: data.comic.originalNumber,
          yearPublished: data.comic.yearPublished,
          ganre: data.comic.ganre
        }
        this.comicIsFound = true;
      }
    });
  }

}
