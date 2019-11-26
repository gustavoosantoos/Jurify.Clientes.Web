import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceitarAdvogadoComponent } from './aceitar-advogado.component';

describe('AceitarAdvogadoComponent', () => {
  let component: AceitarAdvogadoComponent;
  let fixture: ComponentFixture<AceitarAdvogadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceitarAdvogadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceitarAdvogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
