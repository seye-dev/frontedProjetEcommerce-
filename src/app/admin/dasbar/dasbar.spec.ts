import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dasbar } from './dasbar';

describe('Dasbar', () => {
  let component: Dasbar;
  let fixture: ComponentFixture<Dasbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dasbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Dasbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
