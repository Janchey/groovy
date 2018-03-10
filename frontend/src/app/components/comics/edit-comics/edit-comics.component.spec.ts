import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComicsComponent } from './edit-comics.component';

describe('EditComicsComponent', () => {
  let component: EditComicsComponent;
  let fixture: ComponentFixture<EditComicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
