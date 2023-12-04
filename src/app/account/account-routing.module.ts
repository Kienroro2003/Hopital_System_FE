import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateAccountComponent} from './create-account/create-account.component';
import {ChangePasswordComponent} from './change-password/change-password/change-password.component';
import {AdminAuthGuard} from '../helpers/admin-auth.guard';
import {AuthGuard} from '../helpers/auth.guard';

const routes: Routes = [

    {
        path: 'create',
        component: CreateAccountComponent, canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
        path: 'update/password',
        component: ChangePasswordComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
