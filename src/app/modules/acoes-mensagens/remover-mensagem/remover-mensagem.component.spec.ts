import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverMensagemComponent } from './remover-mensagem.component';

describe('RemoverMensagemComponent', () => {
  let component: RemoverMensagemComponent;
  let fixture: ComponentFixture<RemoverMensagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoverMensagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoverMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
