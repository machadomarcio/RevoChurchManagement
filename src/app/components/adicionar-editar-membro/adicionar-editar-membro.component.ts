import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDoc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  loading: boolean;
  usersCollection!: CollectionReference;
  id: string | null | undefined;
  titulo: string;
  textoBotao: string;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute) {
    this.submitted = false;
    this.loading = false;
    this.adicionarMembro = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      rua: [''],
      estadoCivil: ['0'],
      numero: [''],
      bairro: [''],
      cidade: [''],
      cep: [''],
      gps: [false],
      grupoGps: ['0'],
      ecd: [false],
      ec: [false],
      dna: [false],
      batismo: [false],
      dataBatismo: [''],
      foto: [''],
      dataNascimento: [''],
      telefone: ['', Validators.required],
    });

    this.titulo = 'Inserir Membro';
    this.textoBotao = "Adicionar";
    this.id = aRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.carregarDadosMembro(this.id);
    }
  }

  async carregarDadosMembro(id: string) {
    try {
      const db = getFirestore();
      const docRef = doc(db, "membros", id);
      const docSnap = await getDoc(docRef);
      docSnap.data();

      if (docSnap.exists()) {
        this.titulo = "Editar Membro";
        this.textoBotao = "Atualizar";
        const data = docSnap.data();

        this.adicionarMembro.setValue({
          nome: data['membro'].nome,
          sobrenome: data['membro'].sobrenome,
          rua: data['membro'].rua,
          estadoCivil: data['membro'].estadoCivil,
          numero: data['membro'].numero,
          bairro: data['membro'].bairro,
          cidade: data['membro'].cidade,
          cep: data['membro'].cep,
          gps: data['membro'].gps,
          grupoGps: data['membro'].grupoGps,
          ecd: data['membro'].ecd,
          ec: data['membro'].ec,
          dna: data['membro'].dna,
          batismo: data['membro'].batismo,
          dataBatismo: data['membro'].dataBatismo,
          foto: data['membro'].foto,
          dataNascimento: data['membro'].dataNascimento,
          telefone: data['membro'].telefone,
        });

      }
    } catch (error) {
      console.log(error);
    }
  }

  adicionarEditarMembroBase() {
    this.loading = true;
    this.submitted = true;
    if (this.adicionarMembro.status === 'INVALID') {
      this.toastr.warning("Existem campos obrigatórios não preenchidos", 'ATENÇÃO',
        {
          positionClass: 'toast-top-center'
        });
      this.loading = false;
    } else {

      const membro = {
        nome: this.adicionarMembro.value.nome,
        sobrenome: this.adicionarMembro.value.sobrenome,
        rua: this.adicionarMembro.value.rua,
        estadoCivil: this.adicionarMembro.value.estadoCivil,
        numero: this.adicionarMembro.value.numero,
        bairro: this.adicionarMembro.value.bairro,
        cidade: this.adicionarMembro.value.cidade,
        cep: this.adicionarMembro.value.cep,
        gps: this.adicionarMembro.value.gps,
        grupoGps: this.adicionarMembro.value.grupoGps,
        ecd: this.adicionarMembro.value.ecd,
        ec: this.adicionarMembro.value.ec,
        dna: this.adicionarMembro.value.dna,
        batismo: this.adicionarMembro.value.batismo,
        dataBatismo: this.adicionarMembro.value.dataBatismo,
        foto: this.adicionarMembro.value.foto,
        dataNascimento: this.adicionarMembro.value.dataNascimento,
        telefone: this.adicionarMembro.value.telefone,
        dataInsercao: new Date(),
        dataAtualizacao: new Date(),
      };

      if (this.id) {

        const db = getFirestore();
        const docRef = doc(db, "membros", this.id);

        const membro = {
          nome: this.adicionarMembro.value.nome,
          sobrenome: this.adicionarMembro.value.sobrenome,
          rua: this.adicionarMembro.value.rua,
          estadoCivil: this.adicionarMembro.value.estadoCivil,
          numero: this.adicionarMembro.value.numero,
          bairro: this.adicionarMembro.value.bairro,
          cidade: this.adicionarMembro.value.cidade,
          cep: this.adicionarMembro.value.cep,
          gps: this.adicionarMembro.value.gps,
          grupoGps: this.adicionarMembro.value.grupoGps,
          ecd: this.adicionarMembro.value.ecd,
          ec: this.adicionarMembro.value.ec,
          dna: this.adicionarMembro.value.dna,
          batismo: this.adicionarMembro.value.batismo,
          dataBatismo: this.adicionarMembro.value.dataBatismo,
          foto: this.adicionarMembro.value.foto,
          dataNascimento: this.adicionarMembro.value.dataNascimento,
          telefone: this.adicionarMembro.value.telefone,
          dataInsercao: new Date(),
          dataAtualizacao: new Date(),
        }

        updateDoc(docRef, <any>{ membro })
          .then(docRef => {
            this.toastr.success('Membro atualizado com sucesso no banco de dados', 'OPERAÇÃO EFETUADA COM SUCESSO!',
            {
              positionClass: 'toast-top-center'
            });
          console.log("MEMBRO ATUALIZADO COM SUCESSO!");
          this.loading = false;
          this.router.navigate(['/lista-membros']);
          })
          .catch(error => {
            this.toastr.error(error, 'OPERAÇÃO NÃO EFETUADA!',
            {
              positionClass: 'toast-top-center'
            });
          console.log(error);
          this.loading = false;
          })

      } else {
        addDoc(collection(this.firestore, 'membros'), <any>{ membro }).then((documentReference: DocumentReference) => {
          this.toastr.success('Membro adicionado com sucesso no banco de dados', 'OPERAÇÃO EFETUADA COM SUCESSO!',
            {
              positionClass: 'toast-top-center'
            });
          console.log("MEMBRO INCLUÍDO COM SUCESSO!");
          console.log(documentReference.id);
          this.loading = false;
          this.router.navigate(['/lista-membros']);
        }).catch(error => {
          this.toastr.error(error, 'OPERAÇÃO NÃO EFETUADA!',
            {
              positionClass: 'toast-top-center'
            });
          console.log(error);
          this.loading = false;
        });
      }
    }
    this.loading = false;
  }
}


