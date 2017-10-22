import { Component, OnInit, Injectable } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
// import { HttpProductService } from '../services/http.product.service';
import { HttpProductService } from './http.product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

@Injectable()
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  products: IProduct[];
  private httpProductService;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpProductService
             ) {
               this.httpProductService = httpService;
      console.log('product id is: ' + this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;

    this.httpProductService.getProducts()
    .subscribe(products => {
                                this.products = products;
                                const filteredResult = this.products.filter(function(obj) { return obj.id === id; });
                                this.product = filteredResult ? filteredResult[0] : null;
                           });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
