import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainClient } from './main-client';

describe('MainClient', () => {
  let component: MainClient;
  let fixture: ComponentFixture<MainClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainClient],
    }).compileComponents();

    fixture = TestBed.createComponent(MainClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
