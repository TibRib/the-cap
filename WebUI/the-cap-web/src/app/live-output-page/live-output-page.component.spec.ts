import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveOutputPageComponent } from './live-output-page.component';

describe('LiveOutputPageComponent', () => {
  let component: LiveOutputPageComponent;
  let fixture: ComponentFixture<LiveOutputPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveOutputPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveOutputPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
