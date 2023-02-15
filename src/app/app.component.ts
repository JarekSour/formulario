
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Book } from './data/interface/book.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent{

    @ViewChild('content') modal: any;
    modalRef: any;
    formSearch: FormGroup;
    formBook: FormGroup;
    dataSource: any[] = []
    displayedColumns: string[] = ['title', 'subject', 'author', 'publishingDate', 'publisher', 'publisherPhone', 'publisherEmail'];

    constructor(
        private _http: HttpClient,
        private _fb: FormBuilder,
        private modalService: NgbModal
    ) {
        this.formSearch = this._fb.group({
            txtSearch: ['HARR', [Validators.minLength(3)]]
        })

        this.formBook = this._fb.group({
            title: ['', [Validators.required]],
            subject: ['', [Validators.required]],
            author: ['', [Validators.required]],
            publishingDate: ['', [Validators.required]],
            publisher: ['', [Validators.required]],
            publisherPhone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
            publisherEmail: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]]
        })
    }

    onSearch() {
        if (this.formSearch.valid) {

            const params: string = this.formSearch.value.txtSearch
            this._http.get(`${environment.baseUrl}${environment.services.search(params)}`)
                .subscribe((response: Book[]) => {
                    this.dataSource = response
                })
        }
    }

    onClickAdd(content) {
        this.formBook.reset()
        this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    }

    onClickSave() {
        if (this.formBook.valid) {
            const params = this.formBook.value
            params.publisherPhone = params.publisherPhone.toString()
            this._http.post(`${environment.baseUrl}${environment.services.save}`, params)
                .subscribe(response => {
                    this.modalRef.close()
                })
        } else {
            this.formBook.markAllAsTouched()
        }
    }
}
