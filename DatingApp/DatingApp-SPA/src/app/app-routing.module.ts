import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './_guards/auth.guard';

// const routes: Routes = [
//   {path: 'home', component: HomeComponent},
//   {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
//   {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
//   {path: 'lists', component: ListComponent, canActivate: [AuthGuard]},
//   {path: '**', redirectTo: 'home', pathMatch: 'full'}
// ];
const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
      {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
      {path: 'lists', component: ListComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
