import { Component, inject } from '@angular/core';
import { provideFirestore, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


interface Item {
  nome: string,
  sobrenome: string,
  rua: string,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RevoChurchManagement';
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'membros')
    this.items$ = collectionData(aCollection);
  }
}
