import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-editar-membro',
  templateUrl: './adicionar-editar-membro.component.html',
  styleUrls: ['./adicionar-editar-membro.component.css']
})
export class AdicionarEditarMembroComponent {
  firestore: Firestore = inject(Firestore)
  users$!: Observable<any[]>;
  adicionarMembro!: FormGroup;
  submitted: boolean;
  usersCollection!: CollectionReference;

  constructor(private fb: FormBuilder) {
    this.submitted = false;
    this.adicionarMembro = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required]
    });
  }

  adicionarMembroBase() {
    this.submitted = true;
    const membroAdd: any = {
      nome: this.adicionarMembro.value.nome,
      sobrenome: this.adicionarMembro.value.sobrenome,
      dataInsercao: new Date(),
      dataAtualizacao: new Date(),
    };

    addDoc(collection(this.firestore, 'membros'), <any>{ membroAdd }).then((documentReference: DocumentReference) => {
      console.log(documentReference);
    });
  }
}
