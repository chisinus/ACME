import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { IProduct } from '../products/product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpProductService {
    private baseUrl = 'api/products';
    //private baseUrl = './product-data';

    constructor(private http: Http) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get(this.baseUrl)
                    .map(this.extractData)
                    .do(data => console.log('getProducts: ' + JSON.stringify(data)))
                    .catch(this.errorHandler);
    }

    getProduct(id: number): Observable<IProduct> {
        if (id === 0) {
            return Observable.create((observer: any) => {
                observer.next(this.initializeProduct());
                observer.complete();
            });
        }

        const url = `${this.baseUrl}/${id}`;

        return this.http.get(url)
                    .map(this.extractData)
                    .do(data => console.log('getProduct: ' + JSON.stringify(data)))
                    .catch(this.errorHandler);
    }

    deleteProduct(id: number): Observable<Response> {
        return null;
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        return null;
    }

    extractData(response: Response) {
        const body = response.json();

        return body.data || {};
    }

    errorHandler(err: HttpErrorResponse): Observable<any> {
        console.log(err);
        console.log(err.message);
        return Observable.throw(err.message);
    }

    initializeProduct(): any {
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [''],
            releaseData: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null
        };
    }
}
