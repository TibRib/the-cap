import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadboxComponent } from './uploadbox.component';

describe('UploadboxComponent', () => {
  let component: UploadboxComponent;
  let fixture: ComponentFixture<UploadboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
