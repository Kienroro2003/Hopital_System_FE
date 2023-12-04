import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {ListCustomerComponent} from './list-customer/list-customer.component';
import {DetailCustomerComponent} from './detail-customer/detail-customer.component';
import {AuthGuard} from '../helpers/auth.guard';

const routes: Routes = [
    {path: 'customer/list', component: ListCustomerComponent, canActivate: [AuthGuard]},
    {path: 'customer/detail/:id', component: DetailCustomerComponent, canActivate: [AuthGuard]},
    {
        path: 'customer/create', component: CreateCustomerComponent, canActivate: [AuthGuard]
    },
    {
        path: 'customer/edit/:id', component: CreateCustomerComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
