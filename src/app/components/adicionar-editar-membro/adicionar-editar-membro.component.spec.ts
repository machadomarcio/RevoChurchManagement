import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarEditarMembroComponent } from './adicionar-editar-membro.component';

describe('AdicionarEditarMembroComponent', () => {
  let component: AdicionarEditarMembroComponent;
  let fixture: ComponentFixture<AdicionarEditarMembroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarEditarMembroComponent]
    });
    fixture = TestBed.createComponent(AdicionarEditarMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
