import {Injectable} from '@angular/core';
import {IEmployee} from '../../model/employee/iemployee';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IPositionEmployee} from '../../model/employee/iposition-employee';


@Injectable({
    providedIn: 'root'
})
export class EmployeeServiceService {
    API_URL = 'http://localhost:8080/api/employee';

    constructor(private http: HttpClient) {
    }

    // NhiVP lay employee theo code
    getEmployeeByCode(code: string): Observable<IEmployee> {
        return this.http.get<IEmployee>(this.API_URL + '/byCode/' + code);
    }

    // NhiVP lay ds chuc vu tru chuc vu quan ly
    getPositionNotManager(): Observable<IPositionEmployee[]> {
        return this.http.get<IPositionEmployee[]>(this.API_URL + '/position-NotManager/list');
    }

    // NhiVP lay danh sach ma nhan vien da co tai khoan theo list string
    getAllEmployeeHasAccount(): Observable<string[]> {
        return this.http.get<string[]>(this.API_URL + '/listHasAccount');
    }

    // AnDVH findEmployee by ID
    findEmployeeById(id: number): Observable<IEmployee> {
        return this.http.get<IEmployee>(this.API_URL + '/detail/' + id);
    }

    // AnDVH find employee by AccountId
    public findEmployeeByAccountId(accountId: number): Observable<IEmployee> {
        return this.http.get<IEmployee>(`${this.API_URL}/getEmployeeByAccount/${accountId}`);
    }

// AnDVH update employee
    public updateEmployee(id: number, employee: IEmployee): Observable<void> {
        return this.http.patch<void>(`${this.API_URL}/update/${id}`, employee);
    }

    getAllEmployee(): Observable<IEmployee[]> {
        return this.http.get<IEmployee[]>(this.API_URL);
    }

    findAllEmployee(page: number): Observable<IEmployee[]> {
        return this.http.get<IEmployee[]>(this.API_URL + '/employee/list?page=' + page);
      }


    deleteEmployeeById(id: number): Observable<IEmployee> {
        console.log('ID de xoa: ' + id);
        return this.http.delete<IEmployee>(this.API_URL + '/employee-delete/' + id);
    }

    // deleteEmployee(id: number): Observable<void> {
    //     return this.http.delete<void>(this.API_URL + '/employee-delete/' + id);
    // }

    // searchEmployeeByName(value: string): Observable<IEmployee[]> {
    //     return this.http.get<IEmployee[]>(this.API_URL + `/customer-search?name=${value}}`);
    // }

    searchEmployeeByName(value1: string, value3: number): Observable<IEmployee[]> {
        return this.http.get<IEmployee[]>(this.API_URL + `/employee-search?name=${value1}&page=${value3}`);
    }

    // NhiVP lay danh sach ma nhan vien chua co tai khoan theo list string
    getAllEmployeeDontHasAccount(): Observable<string[]> {
        return this.http.get<string[]>(this.API_URL + '/listDontHasAccount');
    }

    // NhiVP lay danh sach so dien thoai
    getAllPhone(): Observable<string[]> {
        return this.http.get<string[]>(this.API_URL + '/list-Phone');
    }

    saveEmployee(employee: IEmployee): Observable<void> {
        return this.http.post<void>( `${this.API_URL}/admin_create`, employee);
    }

    getListPosition(): Observable<any> {
        return this.http.get(this.API_URL + '/position/list');
    }

    adminUpdateEmployee(id: number, employee: IEmployee): Observable<IEmployee> {
        return this.http.patch<IEmployee>(`${this.API_URL}/admin_update/${id}`, employee);
    }
}

