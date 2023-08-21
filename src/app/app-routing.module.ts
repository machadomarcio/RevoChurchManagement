import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMembrosComponent } from './components/lista-membros/lista-membros.component';
import { AdicionarEditarMembroComponent } from './components/adicionar-editar-membro/adicionar-editar-membro.component';

const routes: Routes = [
  { path:'', redirectTo: 'lista-membros', pathMatch: 'full' },
  { path:'lista-membros', component: ListaMembrosComponent },
  { path:'adicionar-editar-membro', component: AdicionarEditarMembroComponent },
  { path:'**', redirectTo: 'lista-membros', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
