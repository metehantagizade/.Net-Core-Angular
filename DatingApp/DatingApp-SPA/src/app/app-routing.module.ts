import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';

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
      {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
      {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
      {path: 'member/edit', component: MemberEditComponent,
          resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListComponent, resolve: {users: ListsResolver}},
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
