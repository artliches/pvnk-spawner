import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvnkAbilitiesComponent } from './pvnk-abilities.component';

describe('PvnkAbilitiesComponent', () => {
  let component: PvnkAbilitiesComponent;
  let fixture: ComponentFixture<PvnkAbilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PvnkAbilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PvnkAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
