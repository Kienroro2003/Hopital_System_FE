import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {TokenStorageService} from '../service/security/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    }
    canActivate(
        next: ActivatedRouteSnapshot): boolean {
        const token = this.tokenStorageService.getToken();

        if (token == null) {
            this.router.navigateByUrl('/login');
            return false;
        } else if (!token || this.tokenStorageService.getUser().account.roles[0].roleId !== 1) {
            this.router.navigateByUrl('/auth/access-denied');
            return false;
        } else {
            return true;
        }
        console.log(this.isRole());
    }

    isRole() {
        const tokenPayload = this.tokenStorageService.getUser().account.roles[0].roleName;
        for (const role of tokenPayload) {
            if (role === 'ROLE_ADMIN') {
                return true;
            }
        }
        return false;
    }
}
