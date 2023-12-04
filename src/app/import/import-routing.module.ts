import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImportManagerComponent} from './import-manager/import-manager.component';
import {ImportMaterialFormComponent} from './import-manager/import-material-form/import-material-form.component';
import {ImportMaterialCustomerFormComponent} from './import-manager/import-material-customer-form/import-material-customer-form.component';
import {AuthGuard} from '../helpers/auth.guard';
import {AdminAuthGuard} from '../helpers/admin-auth.guard';
import {AccountantAuthGuard} from '../helpers/accountant-auth.guard';
import {BothAuthGuard} from '../helpers/both-auth.guard';


const routes: Routes = [
  {path: '', component: ImportManagerComponent, canActivate: [AuthGuard, BothAuthGuard]},
  {path: 'import-material', component: ImportMaterialFormComponent, canActivate: [AuthGuard, BothAuthGuard]},
  {path: 'import-material-customer', component: ImportMaterialCustomerFormComponent, canActivate: [AuthGuard, BothAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule {
}
