import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCategorie } from './edit-categorie';

describe('EditCategorie', () => {
  let component: EditCategorie;
  let fixture: ComponentFixture<EditCategorie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategorie],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCategorie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
