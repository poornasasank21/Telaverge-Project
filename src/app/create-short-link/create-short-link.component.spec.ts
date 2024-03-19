import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShortLinkComponent } from './create-short-link.component';

describe('CreateShortLinkComponent', () => {
  let component: CreateShortLinkComponent;
  let fixture: ComponentFixture<CreateShortLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateShortLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateShortLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
