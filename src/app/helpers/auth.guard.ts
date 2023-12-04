import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../service/security/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private roles: string[];
    constructor(private router: Router,
                private tokenStorageService: TokenStorageService
    ) {
    }

    // xác định role vào được những trang nào
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const user = this.tokenStorageService.getUser().account;
        this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
        console.log('user: ' + this.roles);
        console.log(route.data);
        // this.tokenStorageService.getUser().account.roles[0].roleId !== 1
        // chưa đăng nhập tài khoản
        if (user !== null) {
            const role = this.tokenStorageService.getUser().account.roles[0];
            console.log(role);
            // nếu đăng nhập thất bại
            if (!this.tokenStorageService.isAuthenticated()) {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
