import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createpoll } from './createpoll';

describe('Createpoll', () => {
  let component: Createpoll;
  let fixture: ComponentFixture<Createpoll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createpoll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createpoll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
