import { Firestore, collection, collectionData, deleteDoc, doc, getFirestore } from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';




@Component({
  selector: 'app-lista-membros',
  templateUrl: './lista-membros.component.html',
  styleUrls: ['./lista-membros.component.css']
})
export class ListaMembrosComponent {
  firestore: Firestore = inject(Firestore)
  membros!: Observable<any[]>;
  listaMembros: any[] = [];

  constructor(private toastr: ToastrService, private router: Router) {

  }

  ngOnInit() {
    this.carregarMembros();
  }

  carregarMembros(): void {
    this.listaMembros = [];
    // get documents (data) from the collection using collectionData
    this.membros = collectionData(collection(this.firestore, 'membros'), { idField: 'id' }) as Observable<any[]>;

    this.membros.subscribe(data => {
      this.listaMembros = [];
      data.forEach((element: any) => {
        console.log(element);
        this.listaMembros.push(
          {
            id: element.id,
            nome: element.membro.nome,
            sobrenome: element.membro.sobrenome,
            bairro: element.membro.bairro,
            dataNascimento: element.membro.dataNascimento,
            idade: this.ageFromDateOfBirthday(element.membro.dataNascimento),
            telefone: element.membro.telefone,
            estadoCivil: element.membro.estadoCivil === '0' ? "" : element.membro.estadoCivil,
            cidade: element.membro.cidade,
          }
        );
      })
    })

  }

  public ageFromDateOfBirthday(dateOfBirth: any): any {
    if (dateOfBirth === undefined || dateOfBirth === null || dateOfBirth === '') {
      return undefined;
    }
    const today = new Date();
    const birthDate = new Date(dateOfBirth.substr(6, 4), dateOfBirth.substr(3, 2), dateOfBirth.substr(0, 2));
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  deletarMembro(id: string) {
    const db = getFirestore();
    const docRef = doc(db, "membros", id);
    deleteDoc(docRef).then(() => {
      this.toastr.success('Membro excluído com sucesso!', 'OPERAÇÃO EFETUADA COM SUCESSO!',
        {
          positionClass: 'toast-top-center'
        });
    })
      .catch(error => {
        this.toastr.error(error, 'OPERAÇÃO NÃO EFETUADA!',
          {
            positionClass: 'toast-top-center'
          });
        console.log(error);
      })
  }
}
