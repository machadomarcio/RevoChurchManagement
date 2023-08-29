import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-lista-membros',
  templateUrl: './lista-membros.component.html',
  styleUrls: ['./lista-membros.component.css']
})
export class ListaMembrosComponent {
  firestore: Firestore = inject(Firestore)
  membros!: Observable<any[]>;
  listaMembros: any[] = [];

  constructor() {
    // get a reference to the user-profile collection
    const userProfileCollection = collection(this.firestore, 'membros');


    // get documents (data) from the collection using collectionData
    this.membros = collectionData(collection(this.firestore, 'membros'), { idField: 'id' }) as Observable<any[]>;

    this.membros.subscribe(data => {
      console.log(data);
      data.forEach((element: any) => {
        console.log(element);
        this.listaMembros.push(
          {
            id: element.id,
            nome: element.membroAdd.nome,
            sobrenome: element.membroAdd.sobrenome,
            bairro: element.membroAdd.bairro,
            dataNascimento: element.membroAdd.dataNascimento,
            idade: this.ageFromDateOfBirthday(element.membroAdd.dataNascimento),
            telefone: element.membroAdd.telefone,
          }
        );
      })
    })
  }

  public ageFromDateOfBirthday(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth.substr(6, 4), dateOfBirth.substr(3, 2), dateOfBirth.substr(0, 2));
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
