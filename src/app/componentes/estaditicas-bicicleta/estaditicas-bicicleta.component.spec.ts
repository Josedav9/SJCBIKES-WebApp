import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstaditicasBicicletaComponent } from './estaditicas-bicicleta.component';

describe('EstaditicasBicicletaComponent', () => {
  let component: EstaditicasBicicletaComponent;
  let fixture: ComponentFixture<EstaditicasBicicletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstaditicasBicicletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstaditicasBicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
