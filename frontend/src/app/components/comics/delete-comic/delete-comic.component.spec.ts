import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComicComponent } from './delete-comic.component';

describe('DeleteComicComponent', () => {
  let component: DeleteComicComponent;
  let fixture: ComponentFixture<DeleteComicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteComicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
