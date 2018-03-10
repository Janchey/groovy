import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ComicsService } from '../../services/comics.service';
import { Profile } from 'selenium-webdriver/firefox';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  showMessage;
  message;
  newComic = false;
  loadingComics = false;
  comicForm;
  lockSubmit = false;
  username;
  comicList;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private comicsService: ComicsService

  ) {
    this.generateComicForm();
  }

  generateComicForm() {
    this.comicForm = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(80),
        Validators.minLength(3),
        this.checkTitleCaracters
      ])],
      creator: ['', Validators.required],
      writer: ['', Validators.required],
      artist: ['', Validators.required],
      publisher: ['', Validators.required],
      status: ['', Validators.required],
      number: ['', Validators.required],
      originalNumber: ['', Validators.required],
      yearPublished: ['', Validators.required],
      ganre: ['', Validators.required]

    });
  }

  checkTitleCaracters(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'checkTitleCaracters': true
      }
    }
  }

  newComicForm() {
    this.newComic = true;
  }

  // LOCK AND DISABLE RELOAD BUTTON SO THAT USER CANT CLICK ON IT MORE THAN ONCE EVERY 2s
  reloadComics() {
    this.loadingComics = true;
    this.getAllComics();
    setTimeout(() => {
      this.loadingComics = false;
    }, 2000);
  }

  writeComment() {

  }

  onComicFormSubmit() {
    this.lockSubmit = true;
    this.lockComicForm();

    const comic = {
      title: this.comicForm.get('title').value,
      creator: this.comicForm.get('creator').value,
      writer: this.comicForm.get('writer').value,
      artist: this.comicForm.get('artist').value,
      publisher: this.comicForm.get('publisher').value,
      status: this.comicForm.get('status').value,
      number: this.comicForm.get('number').value,
      originalNumber: this.comicForm.get('originalNumber').value,
      yearPublished: this.comicForm.get('yearPublished').value,
      ganre: this.comicForm.get('ganre').value,
      createdBy: this.username
    }

    this.comicsService.newComic(comic).subscribe(data => {
      if (!data.success) {
        this.showMessage = 'alert alert-danger';
        this.showMessage = data.message;
        this.lockSubmit = false;
        this.unlockComicForm();
      } else {
        this.showMessage = 'alert alert-success';
        this.message = data.message;
        this.getAllComics();
        setTimeout(() => {
          this.newComic = false;
          this.lockSubmit = false;
          this.message = 'Comic has been added to the list';
          this.comicForm.reset();
          this.unlockComicForm();
        },2000);
      }
    });
  }

  goBack() {
    window.location.reload();
  }

  lockComicForm() {
    this.comicForm.get('title').disable();
    this.comicForm.get('creator').disable();
    this.comicForm.get('writer').disable();
    this.comicForm.get('artist').disable();
    this.comicForm.get('publisher').disable();
    this.comicForm.get('status').disable();
    this.comicForm.get('number').disable();
    this.comicForm.get('originalNumber').disable();
    this.comicForm.get('yearPublished').disable();
    this.comicForm.get('ganre').disable();

  }

  unlockComicForm() {
    this.comicForm.get('title').enable();
    this.comicForm.get('creator').enable();
    this.comicForm.get('writer').enable();
    this.comicForm.get('artist').enable();
    this.comicForm.get('publisher').enable();
    this.comicForm.get('status').enable();
    this.comicForm.get('number').enable();
    this.comicForm.get('originalNumber').enable();
    this.comicForm.get('yearPublished').enable();
    this.comicForm.get('ganre').enable();

  }

  getAllComics(){
    this.comicsService.getAllComics().subscribe(data => {
      this.comicList = data.comics;
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });
    this.getAllComics();
  }

}
