import { Firestore, collection, collectionData} from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-lista-membros',
  templateUrl: './lista-membros.component.html',
  styleUrls: ['./lista-membros.component.css']
})
export class ListaMembrosComponent {
  firestore: Firestore = inject(Firestore)
  users$!: Observable<any[]>;

  constructor() {
    // get a reference to the user-profile collection
    const userProfileCollection = collection(this.firestore, 'membros');

    // get documents (data) from the collection using collectionData
    this.users$ = collectionData(userProfileCollection) as Observable<any[]>;

    console.log(this.users$);
  }
}
