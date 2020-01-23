import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { inboxComponent } from './components/inbox/inbox.component';

const routes: Routes = [
  { path: 'inbox', component: inboxComponent },
  { path: '', pathMatch: 'full', redirectTo: '/inbox' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
