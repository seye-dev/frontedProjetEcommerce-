import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCategorie } from './list-categorie';

describe('ListCategorie', () => {
  let component: ListCategorie;
  let fixture: ComponentFixture<ListCategorie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCategorie],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCategorie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
