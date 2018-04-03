import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicsService } from '../../../services/comics.service';

@Component({
  selector: 'app-edit-comics',
  templateUrl: './edit-comics.component.html',
  styleUrls: ['./edit-comics.component.css']
})
export class EditComicsComponent implements OnInit {

  showMessage;
  message;
  lockSubmit = false;
  curentUrl;
  comic;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private comicsService: ComicsService,
    private router: Router
  ) { }

  onEditComicFormSubmit() {
    this.lockSubmit = true;
    this.comicsService.editComic(this.comic).subscribe(data => {
      if (!data.success) {
        this.showMessage = 'alert alert-danger';
        this.message = data.message;
        this.lockSubmit = false;
      } else {
        this.showMessage = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/comics']);
        }), 2000;
      }
    });
  }

  //get image
  imageChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const file: File = files[0];
      this.createImageFromBlob(file);
    }
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.comic.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  
  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.curentUrl = this.activatedRoute.snapshot.params;
    this.comicsService.getSingleComic(this.curentUrl.id).subscribe(data => {
      if (!data.success) {
        this.showMessage = 'alert alert-danger';
        this.message = 'Comic not found';
      } else {
        this.comic = data.comic;
        this.loading = false;
      }
    });

  }

}
