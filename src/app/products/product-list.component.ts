import { Component, OnInit } from '@angular/core';
import { IProduct, Product } from './product';
import { StaticProductService } from '../services/static-product.service';
// import { HttpProductService } from '../services/http.product.service';
// import { HttpProductService } from './http.product.service';
import { HttpProductService } from '../services/http.product.service';

@Component({
templateUrl: './product-list.component.html',
styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    products: IProduct[] = [];
    private _productService;
    private httpProductService;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];

    constructor(private _myService: HttpProductService, private httpService: HttpProductService) {
        this._productService = _myService;
        this.httpProductService = httpService;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('in oninit');

        // this.products = this._productService.getProducts();
        // this.filteredProducts = this.products;
        this.httpService.getProducts()
                        .subscribe(products => {
                                                    this.products = products;
                                                    this.filteredProducts = this.products;
                                               },
                                    error => this.errorMessage = <any>error);
        console.log(this.products.length);
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();

        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
