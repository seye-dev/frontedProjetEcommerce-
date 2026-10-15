import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nawbar } from './nawbar';

describe('Nawbar', () => {
  let component: Nawbar;
  let fixture: ComponentFixture<Nawbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nawbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Nawbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
