import { Component, OnInit } from '@angular/core';
import {IMaterial} from '../../model/material/imaterial';
import {MaterialServiceService} from '../../service/material/material-service.service';

@Component({
    selector: 'app-list-material',
    templateUrl: './list-material.component.html',
    styleUrls: ['./list-material.component.css']
})
export class ListMaterialComponent implements OnInit {
    materialList: IMaterial[];
    materialDelete: IMaterial;
    indexPage = 1;
    totalPages: number;
    searchVal = '';
    arrayNumberPage: number[] = [];
    constructor(private materialService: MaterialServiceService) { }

    ngOnInit(): void {
        this.search();
    }
    search() {
        this.materialService.getAll(this.indexPage - 1, this.searchVal).subscribe(
            next => {
                this.materialList = next.content;
                this.indexPage = next.number + 1;
                this.totalPages = next.totalPages;
                this.setPagination();
            }
        );
    }
    findMaterialDelete(id: number) {
        this.materialDelete = this.materialList.find(m => m.materialId === id); // di tim thang loi~ de xoa
    }

    delete() {
        this.materialService.delete(this.materialDelete.materialId).subscribe(
            next => {
                this.search();
            }
        );
    }

    previousPage() {
        if (this.indexPage === 1) { return; }
        this.indexPage--;
        this.search();
    }

    nextPage() {
        if (this.indexPage === this.totalPages) { return; }
        this.indexPage++;
        this.search();
    }


    private setPagination() {
        if (this.totalPages <= 5) {
            this.arrayNumberPage = [];
            for (let i = 1; i <= this.totalPages; i++) {
                this.arrayNumberPage[i - 1] = i;
            }
        } else if (this.indexPage + 2 <= this.totalPages) {
            if (this.indexPage > 3) {
                this.arrayNumberPage[0] = this.indexPage - 2;
                this.arrayNumberPage[1] = this.indexPage - 1;
                this.arrayNumberPage[2] = this.indexPage;
                this.arrayNumberPage[3] = this.indexPage + 1;
                this.arrayNumberPage[4] = this.indexPage + 2;
            } else {
                this.arrayNumberPage[0] = 1;
                this.arrayNumberPage[1] = 2;
                this.arrayNumberPage[2] = 3;
                this.arrayNumberPage[3] = 4;
                this.arrayNumberPage[4] = 5;
            }
        } else {
            this.arrayNumberPage[0] = this.totalPages - 4;
            this.arrayNumberPage[1] = this.totalPages - 3;
            this.arrayNumberPage[2] = this.totalPages - 2;
            this.arrayNumberPage[3] = this.totalPages - 1;
            this.arrayNumberPage[4] = this.totalPages;
        }
    }

    setIndexPage(p: number) {
        this.indexPage = p;
        this.search();
    }
}
