import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InforMaterialComponent} from './infor-material/infor-material.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CreateMaterialComponent} from './create-material/create-material.component';
import {EditMaterialComponent} from './edit-material/edit-material.component';

import {DetailMaterialComponent} from './detail-material/detail-material.component';
import {ListMaterialComponent} from './list-material/list-material.component';
import {AuthGuard} from "../helpers/auth.guard";


const routes: Routes = [
  {

    path: 'detail/:id', component: DetailMaterialComponent, data: {title: 'Detail'}, canActivate: [AuthGuard]
  },
  {
    path: 'list', component: ListMaterialComponent, canActivate: [AuthGuard]
  },

  {
    path: 'material/create', component: CreateMaterialComponent, canActivate: [AuthGuard]

  },
  {
    path: 'material/edit/:id', component: EditMaterialComponent, canActivate: [AuthGuard]
  },
  {
    path: 'infor', component: InforMaterialComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule {
}
