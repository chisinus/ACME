import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProduct } from '../products/product';

@Injectable()
export class HttpProductService {
    // private baseUrl = './../api/products';
    // private baseUrl = '../products/product-data.ts';
    private baseUrl = 'http://localhost:50000/api/product';

    constructor(private http: Http) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get(this.baseUrl)
                        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
                        // .map(this.extractData)
                        .map(response => response.json())
                        .catch(this.errorHandler);
    }

    getProduct(id: number): Observable<IProduct> {
        console.log('id = ' + id);
        if (id === 0) {
            return Observable.create((observer: any) => {
                   observer.next(this.initializeProduct());
                   observer.complete();
            });
        }

        const url = `${this.baseUrl}/${id}`;
        console.log('url = ' + url);
        return this.http.get(url)
                    // .map(this.extractData)
                    .map(response => response.json())
                    .do(data => console.log('getProduct: ' + JSON.stringify(data)))
                    .catch(this.errorHandler);
    }

    deleteProduct(id: number): Observable<Response> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers});

        const url = `${this.baseUrl}/${id}`;

        return this.http.delete(url, options);
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        console.log('in service saveProduct ' + product.productName);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers});

        if (product.id === 0) {
            return this.createProduct(product, options);
        }

        return this.updateProduct(product, options);
    }

    createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        console.log('in create ' + product.productName);
        console.log(JSON.stringify(product));
        product.id = undefined;
        return this.http.post(this.baseUrl, product, options)
                    .map(response => response.json())
                    .do(data => console.log('create product: ' + JSON.stringify(data)))
                    .catch(this.errorHandler);
    }

    updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        const url = `${this.baseUrl}/${product.id}`;
        console.log(JSON.stringify(product));
        return this.http.put(url, product, options)
                    .map(() => product)
                    .do(data => console.log('update product: ' + JSON.stringify(data)))
                    .catch(this.errorHandler);
    }

    extractData(response: Response) {
        const body = response.json();

        return body.data || {};
    }

    errorHandler(err: HttpErrorResponse): Observable<any> {
        console.log('return an error. ' + err);
        console.log(err.message);
        return Observable.throw(err.message);
    }

    initializeProduct(): IProduct {
        return {
            id: 0,
/*            productName: null, null will cause null parameter on WebApi side, why?
            productCode: null,
            // tags: [''],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null
*/
            productName: '',
            productCode: '',
            // tags: [''],
            releaseDate: '',
            price: 0.00,
            description: '',
            starRating: 0,
            imageUrl: ''
        };
    }
}
