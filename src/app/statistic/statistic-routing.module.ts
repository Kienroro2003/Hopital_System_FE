import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FinancialStatisticComponent} from './financial-statistic/financial-statistic.component';
import {MaterialStatisticComponent} from './material-statistic/material-statistic.component';
import {CustomerStatisticComponent} from './customer-statistic/customer-statistic.component';
import {AuthGuard} from '../helpers/auth.guard';


const routes: Routes = [
  {
    path: 'statistic/material', component: MaterialStatisticComponent, canActivate: [AuthGuard]
  },
  {
    path: 'statistic/financial', component: FinancialStatisticComponent, canActivate: [AuthGuard]
  },
  {
    path: 'statistic/customer', component: CustomerStatisticComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
