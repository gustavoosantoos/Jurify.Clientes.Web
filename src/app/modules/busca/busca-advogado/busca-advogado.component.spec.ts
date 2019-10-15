import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaAdvogadoComponent } from './busca-advogado.component';

describe('BuscaAdvogadoComponent', () => {
  let component: BuscaAdvogadoComponent;
  let fixture: ComponentFixture<BuscaAdvogadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaAdvogadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaAdvogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
