import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvnkIdentityComponent } from './pvnk-identity.component';

describe('PvnkIdentityComponent', () => {
  let component: PvnkIdentityComponent;
  let fixture: ComponentFixture<PvnkIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PvnkIdentityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PvnkIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
