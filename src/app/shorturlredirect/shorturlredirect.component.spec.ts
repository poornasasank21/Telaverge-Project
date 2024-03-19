import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorturlredirectComponent } from './shorturlredirect.component';

describe('ShorturlredirectComponent', () => {
  let component: ShorturlredirectComponent;
  let fixture: ComponentFixture<ShorturlredirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShorturlredirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShorturlredirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
