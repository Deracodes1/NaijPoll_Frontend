import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pollcard } from './pollcard';

describe('Pollcard', () => {
  let component: Pollcard;
  let fixture: ComponentFixture<Pollcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pollcard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pollcard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
