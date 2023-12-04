import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../service/security/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class SellAuthGuard implements CanActivate {
    constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    }
    canActivate(
        next: ActivatedRouteSnapshot): boolean {
        const user = this.tokenStorageService.getUser();

        if (user == null) {
            this.router.navigateByUrl('/auth/login');
            return false;
        } else if (!user || this.tokenStorageService.getUser().account.roles[0].roleId !== 3) {
            this.router.navigateByUrl('/auth/access-denied');
            return false;
        } else {
            return true;
        }
    }

    isRole() {
        const tokenPayload = this.tokenStorageService.getUser().account.roles[0].roleName;
        for (const role of tokenPayload) {
            if (role === 'ROLE_SELL') {
                return true;
            }
        }
        return false;
    }
}
