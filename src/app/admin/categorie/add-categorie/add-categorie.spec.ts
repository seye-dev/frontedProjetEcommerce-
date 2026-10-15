import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCategorie } from './add-categorie';

describe('AddCategorie', () => {
  let component: AddCategorie;
  let fixture: ComponentFixture<AddCategorie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategorie],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategorie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
