import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReativarMensagemComponent } from './reativar-mensagem.component';

describe('ReativarMensagemComponent', () => {
  let component: ReativarMensagemComponent;
  let fixture: ComponentFixture<ReativarMensagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReativarMensagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReativarMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
