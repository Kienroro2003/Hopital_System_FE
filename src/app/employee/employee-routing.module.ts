import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminEditEmployeeComponent} from './admin-edit-employee/admin-edit-employee.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {DetailEmployeeComponent} from './detail-employee/detail-employee.component';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {AuthGuard} from "../helpers/auth.guard";
import {AdminAuthGuard} from "../helpers/admin-auth.guard";


const routes: Routes = [
    {
        path: 'employee/list', component: ListEmployeeComponent, canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
        path: 'employee/detail/:id', component: DetailEmployeeComponent, canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
        path: 'employee/edit', component: EditEmployeeComponent, canActivate: [AuthGuard, AdminAuthGuard]
    },
    {path: 'employee-admin/create', component: CreateEmployeeComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    {path: 'employee-admin/edit/:id', component: AdminEditEmployeeComponent, canActivate: [AuthGuard, AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
