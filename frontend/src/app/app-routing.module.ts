import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeDetailComponent } from './notice-detail/notice-detail.component';
import { NoticeFormComponent } from './notice-form/notice-form.component';
import { NoticeListComponent } from './notice-list/notice-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'notices',
  },
  {
    path: 'notices',
    component: NoticeListComponent
  },
  {
    path: 'notices/:id',
    component: NoticeFormComponent
  },
  {
    path: 'notices/detail/:id',
    component: NoticeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
