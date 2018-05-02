import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstaditicasComponent } from './estaditicas.component';

describe('EstaditicasComponent', () => {
  let component: EstaditicasComponent;
  let fixture: ComponentFixture<EstaditicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstaditicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstaditicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
