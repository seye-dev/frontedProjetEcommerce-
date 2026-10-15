import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUtilisateur } from './add-utilisateur';

describe('AddUtilisateur', () => {
  let component: AddUtilisateur;
  let fixture: ComponentFixture<AddUtilisateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUtilisateur],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUtilisateur);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
